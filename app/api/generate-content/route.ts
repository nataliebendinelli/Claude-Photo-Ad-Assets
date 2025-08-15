import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const { profile, industry, role } = await request.json();

    // Create a detailed prompt for content generation
    const prompt = `You are a marketing content specialist for Accrue, an HR and payroll solutions company. 
    
    Generate targeted marketing content for the following customer profile:
    - Business Size: ${profile} business (${profile === 'small' ? '10-25' : profile === 'medium' ? '26-50' : '51-100'} employees)
    - Industry: ${industry.replace(/_/g, ' ')}
    - Target Role: ${role === 'champion' ? 'Champion (Office Manager/HR Manager)' : 
                     role === 'decision_maker' ? 'Decision Maker (Owner/CEO)' : 
                     role === 'influencer' ? 'Influencer (Bookkeeper/Insurance Broker)' : 
                     'User (Employee/Field Worker)'}
    
    Accrue's tagline is: "Now you know it's right.™"
    
    Generate content that addresses the specific pain points and needs of this profile. The content should be:
    - Specific to their industry challenges
    - Appropriate for their role and decision-making authority
    - Focused on Accrue's HR, payroll, time tracking, and workforce management solutions
    
    Return EXACTLY in this JSON format (no additional text):
    {
      "headlines": [3 compelling headlines that grab attention],
      "painPoints": [4 specific pain points this profile experiences],
      "benefits": [3 key benefits Accrue provides for this profile],
      "ctas": [3 strong call-to-action phrases]
    }
    
    Make the content highly specific and actionable for the ${industry.replace(/_/g, ' ')} industry.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106", // Using gpt-3.5-turbo for cost efficiency
      messages: [
        {
          role: "system",
          content: "You are a marketing content specialist. Always return valid JSON only, with no additional text or markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" } // Ensures JSON response
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse the JSON response
    const generatedContent = JSON.parse(content);

    // Validate the response structure
    if (!generatedContent.headlines || !generatedContent.painPoints || 
        !generatedContent.benefits || !generatedContent.ctas) {
      throw new Error('Invalid response structure from OpenAI');
    }

    return NextResponse.json(generatedContent);

  } catch (error) {
    console.error('Error generating content:', error);
    
    // Check if it's an OpenAI API error
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API key. Please check your configuration.' },
          { status: 401 }
        );
      }
      
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { error: 'OpenAI API quota exceeded. Please check your OpenAI account.' },
          { status: 429 }
        );
      }
    }

    // Fallback to hardcoded content if API fails
    const fallbackContent = {
      headlines: [
        "Streamline HR for your team",
        "Stop managing payroll with spreadsheets",
        "Simple HR tools that actually work"
      ],
      painPoints: [
        "Manual timesheet calculations waste hours",
        "Payroll errors cause compliance issues",
        "Multiple systems don't talk to each other",
        "Scaling is painful without proper tools"
      ],
      benefits: [
        "Automated payroll and tax compliance",
        "All-in-one HR platform",
        "24/7 expert support included"
      ],
      ctas: [
        "Start Free Trial",
        "Get a Demo",
        "See How It Works"
      ]
    };

    return NextResponse.json({
      ...fallbackContent,
      fallback: true,
      error: 'Using fallback content due to API error'
    });
  }
}