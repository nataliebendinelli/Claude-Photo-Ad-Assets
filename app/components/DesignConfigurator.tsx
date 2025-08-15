import React, { useState, useEffect } from 'react';
import { Type, Image, Palette, Download, Save, Eye, Upload, RefreshCw, Zap, Users, Target, Briefcase, X, ZoomIn, ZoomOut, Sparkles, Wand2 } from 'lucide-react';

interface TextElement {
  id: string;
  content: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  position: { x: number; y: number };
  alignment: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'medium' | 'semibold' | 'bold';
}

interface ImageElement {
  id: string;
  src: string;
  alt: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface DesignConfig {
  template: unknown;
  textElements: TextElement[];
  imageElements: ImageElement[];
  backgroundColor: string;
  brandColors: string[];
  targetProfile: 'small' | 'medium' | 'large';
  targetIndustry: string;
  targetRole: 'champion' | 'decision_maker' | 'influencer' | 'user';
}

interface GeneratedContent {
  headlines: string[];
  painPoints: string[];
  benefits: string[];
  ctas: string[];
}

// AI Content Generator Component
const AIContentGenerator: React.FC<{
  profile: string;
  industry: string;
  role: string;
  onContentGenerated: (content: GeneratedContent) => void;
  isGenerating: boolean;
}> = ({ profile, industry, role, onContentGenerated, isGenerating }) => {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const generateContent = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Call the API route
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profile,
          industry,
          role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      // If using fallback content, notify user
      if (data.fallback) {
        setError('Using offline content. Add OpenAI API key for AI-generated content.');
      }

      onContentGenerated(data);
    } catch (err) {
      console.error('Error generating content:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate content');
      
      // Fallback to original hardcoded content generation
      generateContentFallback();
    } finally {
      setIsLoading(false);
    }
  };
  
  const generateContentFallback = () => {
    // Simulate AI content generation based on profile
    const profileData = {
      small: {
        champion: {
          headlines: [
            "Get your time back with automated payroll",
            "Stop managing schedules with spreadsheets", 
            "Simple HR tools that actually work"
          ],
          painPoints: [
            "End manual timesheet calculations forever",
            "Stop chasing down missing punch cards",
            "Eliminate payroll errors and corrections",
            "Manage seasonal staffing changes"
          ],
          benefits: [
            "Set up new employees in under 5 minutes",
            "Automated tax filing and compliance",
            "24/7 support from real HR experts"
          ],
          ctas: [
            "Start Free Trial",
            "Get Demo Today",
            "See How Easy It Is"
          ]
        },
        decision_maker: {
          headlines: [
            "Protect your business from costly mistakes",
            "Scale without losing control of costs",
            "Built for the next generation of business"
          ],
          painPoints: [
            "Avoid expensive compliance penalties",
            "Stop worrying about tax deadlines",
            "Reduce dependency on key employees"
          ],
          benefits: [
            "Guaranteed tax compliance protection",
            "Real-time labor cost visibility",
            "Local support when you need it"
          ],
          ctas: [
            "Protect My Business",
            "Schedule Consultation",
            "Calculate ROI"
          ]
        },
        influencer: {
          headlines: [
            "Finally, payroll that syncs with QuickBooks",
            "Clean books without the cleanup",
            "Accounting-friendly HR platform"
          ],
          painPoints: [
            "Stop fixing manual entry errors",
            "Get detailed audit trails instantly",
            "Eliminate double data entry"
          ],
          benefits: [
            "Perfect QuickBooks integration",
            "Detailed transaction history",
            "One-click report generation"
          ],
          ctas: [
            "See Integration Demo",
            "Try Free for 30 Days",
            "View Sample Reports"
          ]
        },
        user: {
          headlines: [
            "Clock in from anywhere with your phone",
            "Check your pay stub instantly",
            "Request time off in seconds"
          ],
          painPoints: [
            "No more forgotten paper timesheets",
            "Stop waiting for pay stub printouts",
            "End email chains for simple requests"
          ],
          benefits: [
            "Mobile app works offline",
            "Instant notifications for approvals",
            "Simple, intuitive design"
          ],
          ctas: [
            "Download App",
            "Get Mobile Access",
            "Try It Now"
          ]
        }
      },
      medium: {
        champion: {
          headlines: [
            "Standardize HR across all locations",
            "If it requires manual work, it's broken",
            "Multi-location made simple"
          ],
          painPoints: [
            "End inconsistent processes across sites",
            "Stop being the bottleneck for approvals",
            "Eliminate location-specific workarounds"
          ],
          benefits: [
            "Unified dashboard for all locations",
            "Role-based access controls",
            "Automated workflow routing"
          ],
          ctas: [
            "See Multi-Location Demo",
            "Schedule Implementation",
            "Get Started Today"
          ]
        },
        decision_maker: {
          headlines: [
            "Scale with confidence and control",
            "Visibility without micromanagement",
            "Infrastructure that grows with you"
          ],
          painPoints: [
            "Stop getting pulled into HR issues",
            "Reduce operational complexity",
            "Maintain standards across growth"
          ],
          benefits: [
            "Executive dashboard insights",
            "Automated compliance monitoring",
            "Scalable architecture built for growth"
          ],
          ctas: [
            "See Executive Demo",
            "Calculate Growth ROI",
            "Schedule Strategy Call"
          ]
        },
        influencer: {
          headlines: [
            "Benefits administration that actually works",
            "Real-time deduction tracking",
            "Broker-friendly platform design"
          ],
          painPoints: [
            "Eliminate benefits enrollment errors",
            "Stop manual deduction calculations",
            "End compliance reporting headaches"
          ],
          benefits: [
            "Automated benefits sync",
            "Real-time eligibility tracking",
            "Broker portal access"
          ],
          ctas: [
            "Partner With Us",
            "See Broker Tools",
            "Schedule Integration"
          ]
        },
        user: {
          headlines: [
            "Everything HR in one mobile app",
            "Self-service that actually serves",
            "Modern tools for modern workers"
          ],
          painPoints: [
            "Stop calling HR for simple requests",
            "End confusion about benefits",
            "Get instant access to your info"
          ],
          benefits: [
            "Complete self-service capabilities",
            "Push notifications for updates",
            "Offline access when needed"
          ],
          ctas: [
            "Download Mobile App",
            "Get Self-Service Access",
            "Try All Features"
          ]
        }
      },
      large: {
        champion: {
          headlines: [
            "Enterprise HR without enterprise complexity",
            "If managers can't use it, it doesn't work",
            "Scalable systems for growing teams"
          ],
          painPoints: [
            "Unify processes across departments",
            "Reduce administrative overhead",
            "Maintain compliance at scale"
          ],
          benefits: [
            "Department-level reporting and controls",
            "Automated onboarding workflows",
            "Advanced analytics and insights"
          ],
          ctas: [
            "Schedule Enterprise Demo",
            "See Compliance Features",
            "Talk to HR Specialist"
          ]
        },
        decision_maker: {
          headlines: [
            "Infrastructure that protects growth",
            "Systems that work without you",
            "Scale with complete confidence"
          ],
          painPoints: [
            "Reduce operational risk exposure",
            "Get visibility across all operations",
            "Maintain control during rapid growth"
          ],
          benefits: [
            "Real-time executive dashboards",
            "Automated risk monitoring",
            "Audit-ready documentation"
          ],
          ctas: [
            "See Enterprise ROI",
            "Schedule Executive Brief",
            "Get Risk Assessment"
          ]
        },
        influencer: {
          headlines: [
            "Compliance monitoring that prevents problems",
            "Benefits platform built for scale",
            "Keep large teams compliant automatically"
          ],
          painPoints: [
            "Prevent compliance violations before they happen",
            "Manage complex benefits eligibility",
            "Reduce audit preparation time"
          ],
          benefits: [
            "Automated compliance alerts",
            "Advanced benefits modeling",
            "Complete audit trail management"
          ],
          ctas: [
            "See Compliance Dashboard",
            "Schedule Benefits Review",
            "Get Audit Preparation"
          ]
        },
        user: {
          headlines: [
            "Mobile-first for distributed teams",
            "Field-ready HR tools",
            "Everything works from anywhere"
          ],
          painPoints: [
            "Clock in from any job site",
            "Access info without WiFi",
            "Get approvals without delays"
          ],
          benefits: [
            "GPS-enabled time tracking",
            "Offline mode for remote work",
            "Real-time sync when connected"
          ],
          ctas: [
            "Download Field App",
            "Get Mobile Setup",
            "Try Offline Features"
          ]
        }
      }
    };

    // Get content based on current selection
    const profileKey = profile as keyof typeof profileData;
    const roleKey = role as keyof typeof profileData.small;
    const content = profileData[profileKey]?.[roleKey] || profileData.small.champion;
    
    // Add industry-specific modifications
    const industryModifications = {
      'retail': {
        suffix: ' for retail teams',
        painPoint: 'Manage seasonal staffing changes'
      },
      'restaurant': {
        suffix: ' for restaurant teams', 
        painPoint: 'Handle tip reporting and split shifts'
      },
      'construction': {
        suffix: ' for construction crews',
        painPoint: 'Track time across multiple job sites'
      },
      'healthcare': {
        suffix: ' for healthcare facilities',
        painPoint: 'Manage complex shift schedules'
      }
    };

    const industryKey = industry as keyof typeof industryModifications;
    const industryMod = industryModifications[industryKey] || { suffix: '', painPoint: '' };
    
    // Modify content based on industry
    const modifiedContent = {
      headlines: content.headlines.map(h => h + (industryMod.suffix || '')),
      painPoints: [...content.painPoints.slice(0, 3), industryMod.painPoint].filter(Boolean),
      benefits: content.benefits,
      ctas: content.ctas
    };

    onContentGenerated(modifiedContent);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 border border-blue-200">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-blue-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI Content Generator (Powered by ChatGPT)
        </h4>
        <button
          onClick={generateContent}
          disabled={isGenerating || isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm font-medium"
        >
          {(isGenerating || isLoading) ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Wand2 className="w-4 h-4" />
          )}
          {(isGenerating || isLoading) ? 'Generating...' : 'Generate AI Content'}
        </button>
      </div>
      
      <p className="text-sm text-blue-700 mb-3">
        Generate targeted messaging for <strong>{profile}</strong> business <strong>{role}</strong> in <strong>{industry.replace(/_/g, ' ')}</strong>
      </p>
      
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded p-2 mb-3">
          ⚠️ {error}
        </div>
      )}
      
      <div className="bg-white rounded p-3 text-xs text-gray-600">
        <strong>AI will create:</strong> Real-time AI-generated headlines, pain points, benefits, and CTAs using ChatGPT, specifically crafted for your selected customer profile and industry.
        {!process.env.NEXT_PUBLIC_OPENAI_CONFIGURED && (
          <div className="mt-2 text-orange-600">
            <strong>Note:</strong> Add your OpenAI API key to enable AI generation.
          </div>
        )}
      </div>
    </div>
  );
};

// Design Preview Component
const DesignPreview: React.FC<{
  config: DesignConfig;
  onClose: () => void;
  onExport?: () => void;
}> = ({ config, onClose, onExport }) => {
  const [zoom, setZoom] = useState(0.8);

  const canvasWidth = 400;
  const canvasHeight = 400;

  const getFontWeightValue = (weight: string) => {
    switch (weight) {
      case 'normal': return '400';
      case 'medium': return '500';
      case 'semibold': return '600';
      case 'bold': return '700';
      default: return '400';
    }
  };

  const getProfileInfo = () => {
    const profiles = {
      small: 'Small Business (10-25 employees)',
      medium: 'Medium Business (26-50 employees)', 
      large: 'Large Business (51-100 employees)'
    };
    
    const roles = {
      champion: 'Champion',
      decision_maker: 'Decision Maker',
      influencer: 'Influencer',
      user: 'User'
    };
    
    return {
      profile: profiles[config.targetProfile],
      role: roles[config.targetRole],
      industry: config.targetIndustry.replace(/_/g, ' ')
    };
  };

  const profileInfo = getProfileInfo();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-7xl max-h-[90vh] w-full mx-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Design Preview</h2>
            <p className="text-gray-600 mt-1">
              {profileInfo.profile} • {profileInfo.role} • {profileInfo.industry}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                disabled={zoom <= 0.25}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                disabled={zoom >= 2}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            {onExport && (
              <button
                onClick={onExport}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="flex-1 p-6 overflow-auto bg-gray-100">
          <div className="flex justify-center">
            <div 
              className="relative border-2 border-gray-300 shadow-lg bg-white"
              style={{
                width: canvasWidth * zoom,
                height: canvasHeight * zoom,
                backgroundColor: config.backgroundColor,
              }}
            >
              {/* Background */}
              <div 
                className="absolute inset-0"
                style={{ backgroundColor: config.backgroundColor }}
              />

              {/* Images */}
              {config.imageElements.map((image) => (
                <div
                  key={image.id}
                  className="absolute"
                  style={{
                    left: `${image.position.x}%`,
                    top: `${image.position.y}%`,
                    width: image.size.width * zoom,
                    height: image.size.height * zoom,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded"
                    draggable={false}
                  />
                </div>
              ))}

              {/* Text Elements */}
              {config.textElements.map((text) => (
                <div
                  key={text.id}
                  className="absolute p-2 rounded"
                  style={{
                    left: `${text.position.x}%`,
                    top: `${text.position.y}%`,
                    color: text.color,
                    fontSize: `${text.fontSize * zoom}px`,
                    fontFamily: text.fontFamily,
                    fontWeight: getFontWeightValue(text.fontWeight),
                    textAlign: text.alignment,
                    maxWidth: '80%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {text.content}
                </div>
              ))}

              {/* Accrue Logo */}
              <div
                className="absolute bottom-4 right-4 p-2 bg-white bg-opacity-90 rounded"
                style={{
                  fontSize: `${16 * zoom}px`
                }}
              >
                <div className="font-bold text-gray-800" style={{ fontSize: `${20 * zoom}px` }}>
                  accrue
                </div>
                <div className="text-gray-600 text-right" style={{ fontSize: `${10 * zoom}px` }}>
                  Now you know it&apos;s right.™
                </div>
              </div>

              {/* Default content if no elements */}
              {config.textElements.length === 0 && config.imageElements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-2xl font-bold mb-2" style={{ color: config.brandColors[0] || '#1B365D' }}>
                      Now you know it&apos;s right.™
                    </div>
                    <div className="text-lg">
                      Add text and images using the configurator
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span>Canvas: {canvasWidth} × {canvasHeight}px</span>
              <span>Elements: {config.textElements.length} text, {config.imageElements.length} images</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Target: {profileInfo.profile}</span>
              <span>Role: {profileInfo.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Design Configurator Component
const DesignConfigurator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'targeting' | 'text' | 'images' | 'branding'>('targeting');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedContent, setSelectedContent] = useState<{
    headline: string | null;
    painPoint: string | null;
    benefit: string | null;
    cta: string | null;
    custom: string | null;
  }>({
    headline: null,
    painPoint: null,
    benefit: null,
    cta: null,
    custom: null
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [customText, setCustomText] = useState<string>('');
  
  const [config, setConfig] = useState<DesignConfig>({
    template: null,
    textElements: [
      {
        id: '1',
        content: 'Now you know it&apos;s right.™',
        fontSize: 32,
        fontFamily: 'Poppins',
        color: '#1B365D',
        position: { x: 50, y: 40 },
        alignment: 'center',
        fontWeight: 'bold'
      }
    ],
    imageElements: [],
    backgroundColor: '#FFFFFF',
    brandColors: ['#1B365D', '#4A90C2', '#404040', '#FFFFFF'],
    targetProfile: 'small',
    targetIndustry: 'retail',
    targetRole: 'champion'
  });

  // Customer Profile Data
  const customerProfiles = {
    small: {
      label: 'Small Business (10-25 employees)',
      industries: ['retail', 'restaurant', 'construction', 'home_services', 'financial_services', 'salon_spa', 'healthcare', 'auto_repair'],
      roles: {
        champion: { label: 'Champion (Office Manager)', persona: 'Maggie Hall' },
        decision_maker: { label: 'Decision Maker (Owner)', persona: 'George Hall' },
        influencer: { label: 'Influencer (Bookkeeper)', persona: 'Tyler James' },
        user: { label: 'User (Employee)', persona: 'Ben Taylor' }
      }
    },
    medium: {
      label: 'Medium Business (26-50 employees)',
      industries: ['retail', 'restaurant', 'construction', 'home_services', 'financial_services', 'healthcare', 'wholesale', 'automotive', 'franchisees'],
      roles: {
        champion: { label: 'Champion (Office Manager)', persona: 'Tanya Boyd' },
        decision_maker: { label: 'Decision Maker (Owner/CEO)', persona: 'David Kim' },
        influencer: { label: 'Influencer (Insurance Broker)', persona: 'Carmen Blake' },
        user: { label: 'User (Employee)', persona: 'Jada Wells' }
      }
    },
    large: {
      label: 'Large Business (51-100 employees)',
      industries: ['retail', 'restaurant', 'construction', 'home_services', 'financial_services', 'healthcare', 'wholesale', 'automotive', 'franchise_owner'],
      roles: {
        champion: { label: 'Champion (HR Manager)', persona: 'Sara Jordan' },
        decision_maker: { label: 'Decision Maker (Owner/CEO)', persona: 'Carlos Perez' },
        influencer: { label: 'Influencer (Insurance Broker)', persona: 'Dan Price' },
        user: { label: 'User (Field Tech)', persona: 'Myles Grant' }
      }
    }
  };

  const fontFamilies = ['Poppins', 'Arial', 'Helvetica', 'Georgia'];
  const fontWeights = [
    { value: 'normal', label: 'Regular' },
    { value: 'medium', label: 'Medium' },
    { value: 'semibold', label: 'Semi Bold' },
    { value: 'bold', label: 'Bold' }
  ];

  const handleContentSelection = (type: 'headline' | 'painPoint' | 'benefit' | 'cta', content: string) => {
    setSelectedContent(prev => ({
      ...prev,
      [type]: prev[type] === content ? null : content
    }));
  };

  const addSelectedContentToDesign = () => {
    const { headline, painPoint, benefit, cta, custom } = selectedContent;
    const contentParts = [headline, painPoint, benefit, cta, custom].filter(Boolean);
    
    if (contentParts.length > 0) {
      const combinedContent = contentParts
        .map(text => text && (text.endsWith('.') || text.endsWith('!') || text.endsWith('?')) ? text : (text || '') + '.')
        .join(' ');
      addTextElementFromAI(combinedContent);
      
      // Reset selections after adding
      setSelectedContent({
        headline: null,
        painPoint: null,
        benefit: null,
        cta: null,
        custom: null
      });
      setCustomText('');
    }
  };

  const handleContentGenerated = (content: GeneratedContent) => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  };

  const addTextElementFromAI = (preset: string) => {
    const newElement: TextElement = {
      id: Date.now().toString(),
      content: preset,
      fontSize: 24,
      fontFamily: 'Poppins',
      color: '#1B365D',
      position: { x: 50, y: 30 + (config.textElements.length * 15) },
      alignment: 'center',
      fontWeight: 'semibold'
    };
    setConfig(prev => ({
      ...prev,
      textElements: [...prev.textElements, newElement]
    }));
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setConfig(prev => ({
      ...prev,
      textElements: prev.textElements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  };

  // Unused function - commenting out to satisfy linter
  // const addTextElement = (preset?: string) => {
  //   const newElement: TextElement = {
  //     id: Date.now().toString(),
  //     content: preset || 'New Text',
  //     fontSize: 18,
  //     fontFamily: 'Poppins',
  //     color: '#1B365D',
  //     position: { x: 50, y: 50 },
  //     alignment: 'left',
  //     fontWeight: 'normal'
  //   };
  //   setConfig(prev => ({
  //     ...prev,
  //     textElements: [...prev.textElements, newElement]
  //   }));
  // };

  const removeTextElement = (id: string) => {
    setConfig(prev => ({
      ...prev,
      textElements: prev.textElements.filter(el => el.id !== id)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: ImageElement = {
          id: Date.now().toString(),
          src: e.target?.result as string,
          alt: file.name,
          position: { x: 0, y: 0 },
          size: { width: 200, height: 200 }
        };
        setConfig(prev => ({
          ...prev,
          imageElements: [...prev.imageElements, newImage]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleSave = () => {
    console.log('Saving design:', config);
    alert('Design saved successfully!');
  };

  const handleExport = () => {
    console.log('Exporting design:', config);
    alert('Design exported successfully!');
  };

  const currentProfile = customerProfiles[config.targetProfile];

  // Reset selected content when profile changes
  useEffect(() => {
    setGeneratedContent(null);
    setSelectedContent({
      headline: null,
      painPoint: null,
      benefit: null,
      cta: null,
      custom: null
    });
    setCustomText('');
  }, [config.targetProfile, config.targetRole, config.targetIndustry]);

  return (
    <div className="w-full h-screen bg-white flex">
      {/* Main Configurator */}
      <div className="flex-1 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-blue-900">AI-Powered Design Configurator</h2>
              <p className="text-gray-600 mt-1">Generate targeted Accrue messaging with AI for {currentProfile.label}</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'targeting', label: 'Target Profile', icon: Target },
              { id: 'text', label: 'AI Content & Text', icon: Type },
              { id: 'images', label: 'Images & Assets', icon: Image },
              { id: 'branding', label: 'Accrue Branding', icon: Palette }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'targeting' | 'text' | 'images' | 'branding')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm border-b-2 transition-colors font-medium ${
                    activeTab === tab.id
                      ? 'border-blue-900 text-blue-900'
                      : 'border-transparent text-gray-600 hover:text-blue-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'targeting' && (
            <div className="space-y-6">
              {/* Profile Selection */}
              <div>
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Customer Profile
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(customerProfiles).map(([key, profile]) => (
                    <div
                      key={key}
                      onClick={() => setConfig(prev => ({ ...prev, targetProfile: key as 'small' | 'medium' | 'large' }))}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        config.targetProfile === key
                          ? 'border-blue-900 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-500'
                      }`}
                    >
                      <h4 className="font-semibold text-blue-900">{profile.label}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Industries: {profile.industries.slice(0, 3).join(', ')}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Selection */}
              <div>
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Target Industry
                </h3>
                <select
                  value={config.targetIndustry}
                  onChange={(e) => setConfig(prev => ({ ...prev, targetIndustry: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white"
                >
                  {currentProfile.industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Selection */}
              <div>
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Target Role
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(currentProfile.roles).map(([roleKey, roleData]) => (
                    <div
                      key={roleKey}
                      onClick={() => setConfig(prev => ({ ...prev, targetRole: roleKey as 'champion' | 'decision_maker' | 'influencer' | 'user' }))}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        config.targetRole === roleKey
                          ? 'border-blue-900 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-500'
                      }`}
                    >
                      <h4 className="font-medium text-blue-900">{roleData.label}</h4>
                      <p className="text-sm text-gray-600">Persona: {roleData.persona}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Target Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Current Target</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Profile:</strong> {currentProfile.label}</p>
                  <p><strong>Industry:</strong> {config.targetIndustry.replace(/_/g, ' ')}</p>
                  <p><strong>Role:</strong> {currentProfile.roles[config.targetRole].label}</p>
                  <p><strong>Persona:</strong> {currentProfile.roles[config.targetRole].persona}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div className="space-y-6">
              {/* AI Content Generator */}
              <AIContentGenerator
                profile={config.targetProfile}
                industry={config.targetIndustry}
                role={config.targetRole}
                onContentGenerated={handleContentGenerated}
                isGenerating={isGenerating}
              />

              {/* Generated Content Display */}
              {generatedContent && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI-Generated Content
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Headlines</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.headlines.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handleContentSelection('headline', preset)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all transform hover:scale-105 font-medium shadow-sm cursor-pointer ${
                              selectedContent.headline === preset
                                ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white ring-2 ring-blue-300'
                                : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Pain Points</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.painPoints.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handleContentSelection('painPoint', preset)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all transform hover:scale-105 font-medium shadow-sm cursor-pointer ${
                              selectedContent.painPoint === preset
                                ? 'bg-gradient-to-r from-red-700 to-red-800 text-white ring-2 ring-red-300'
                                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.benefits.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handleContentSelection('benefit', preset)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all transform hover:scale-105 font-medium shadow-sm cursor-pointer ${
                              selectedContent.benefit === preset
                                ? 'bg-gradient-to-r from-green-700 to-green-800 text-white ring-2 ring-green-300'
                                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Call to Actions</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedContent.ctas.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handleContentSelection('cta', preset)}
                            className={`px-3 py-2 text-sm rounded-lg transition-all transform hover:scale-105 font-medium shadow-sm cursor-pointer ${
                              selectedContent.cta === preset
                                ? 'bg-gradient-to-r from-purple-700 to-purple-800 text-white ring-2 ring-purple-300'
                                : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                            }`}
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Content Preview */}
              {(selectedContent.headline || selectedContent.painPoint || selectedContent.benefit || selectedContent.cta || selectedContent.custom) && (
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Selected Content Preview
                    </h3>
                    <button
                      onClick={addSelectedContentToDesign}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      Add to Design
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-indigo-100">
                    <p className="text-gray-800 leading-relaxed">
                      {[selectedContent.headline, selectedContent.painPoint, selectedContent.benefit, selectedContent.cta, selectedContent.custom]
                        .filter(Boolean)
                        .map(text => text && (text.endsWith('.') || text.endsWith('!') || text.endsWith('?')) ? text : (text || '') + '.')
                        .join(' ')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs text-indigo-600">
                    {selectedContent.headline && <span className="bg-blue-100 px-2 py-1 rounded">Headline ✓</span>}
                    {selectedContent.painPoint && <span className="bg-red-100 px-2 py-1 rounded">Pain Point ✓</span>}
                    {selectedContent.benefit && <span className="bg-green-100 px-2 py-1 rounded">Benefit ✓</span>}
                    {selectedContent.cta && <span className="bg-purple-100 px-2 py-1 rounded">CTA ✓</span>}
                    {selectedContent.custom && <span className="bg-gray-100 px-2 py-1 rounded">Custom ✓</span>}
                  </div>
                </div>
              )}

              {/* Custom Text Input */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Custom Text Creator
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <textarea
                    placeholder="Type your custom text here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors resize-none"
                    rows={3}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                  />
                  
                  <button
                    onClick={() => {
                      if (customText.trim()) {
                        setSelectedContent(prev => ({ ...prev, custom: customText.trim() }));
                        setCustomText('');
                      }
                    }}
                    disabled={!customText.trim()}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Preview
                  </button>
                </div>
              </div>

              {/* Text Elements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-900">Text Elements</h3>
                </div>

                {config.textElements.map(element => (
                  <div
                    key={element.id}
                    className={`border rounded-lg p-4 mb-4 transition-colors ${
                      selectedElement === element.id ? 'border-blue-900 bg-blue-50' : 'border-gray-200 bg-white'
                    }`}
                    onClick={() => setSelectedElement(element.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Text Element</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTextElement(element.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Content
                        </label>
                        <textarea
                          value={element.content}
                          onChange={(e) => updateTextElement(element.id, { content: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors resize-none"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Font Family
                          </label>
                          <select
                            value={element.fontFamily}
                            onChange={(e) => updateTextElement(element.id, { fontFamily: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white"
                          >
                            {fontFamilies.map(font => (
                              <option key={font} value={font}>{font}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Font Size
                          </label>
                          <input
                            type="number"
                            value={element.fontSize}
                            onChange={(e) => updateTextElement(element.id, { fontSize: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                            min="8"
                            max="72"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={element.color}
                              onChange={(e) => updateTextElement(element.id, { color: e.target.value })}
                              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                            />
                          </div>
                          {/* Brand Color Quick Select */}
                          <div className="flex gap-1 mt-2">
                            {config.brandColors.map(color => (
                              <button
                                key={color}
                                onClick={() => updateTextElement(element.id, { color: color })}
                                className="w-6 h-6 rounded border-2 border-gray-300 hover:border-blue-900 cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weight
                          </label>
                          <select
                            value={element.fontWeight}
                            onChange={(e) => updateTextElement(element.id, { fontWeight: e.target.value as 'normal' | 'medium' | 'semibold' | 'bold' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white"
                          >
                            {fontWeights.map(weight => (
                              <option key={weight.value} value={weight.value}>{weight.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alignment
                          </label>
                          <select
                            value={element.alignment}
                            onChange={(e) => updateTextElement(element.id, { alignment: e.target.value as 'left' | 'center' | 'right' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors bg-white"
                          >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-blue-900">Images & Assets</h3>
                <label className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 cursor-pointer font-medium transition-colors">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {config.imageElements.map(image => (
                <div key={image.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Width
                      </label>
                      <input
                        type="number"
                        value={image.size.width}
                        onChange={(e) => {
                          const newImages = config.imageElements.map(img =>
                            img.id === image.id
                              ? { ...img, size: { ...img.size, width: parseInt(e.target.value) } }
                              : img
                          );
                          setConfig(prev => ({ ...prev, imageElements: newImages }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height
                      </label>
                      <input
                        type="number"
                        value={image.size.height}
                        onChange={(e) => {
                          const newImages = config.imageElements.map(img =>
                            img.id === image.id
                              ? { ...img, size: { ...img.size, height: parseInt(e.target.value) } }
                              : img
                          );
                          setConfig(prev => ({ ...prev, imageElements: newImages }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {config.imageElements.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">No images added yet</p>
                  <p>Upload images to enhance your targeted design</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-blue-900 mb-4">Accrue Brand Settings</h3>
                
                {/* Brand Colors */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-3">Brand Colors</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {config.brandColors.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className="w-16 h-16 rounded-lg border-2 border-gray-300 mx-auto mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-xs font-mono text-gray-600">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Background Color */}
                <div className="mb-6">
                  <h4 className="font-medium text-blue-900 mb-3">Background</h4>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={config.backgroundColor}
                      onChange={(e) => setConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-16 h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                    <span className="text-sm text-gray-600 font-mono">{config.backgroundColor}</span>
                    
                    {/* Quick background presets */}
                    <div className="flex gap-2 ml-4">
                      {['#FFFFFF', '#F8F9FA', '#1B365D', '#4A90C2'].map(bgColor => (
                        <button
                          key={bgColor}
                          onClick={() => setConfig(prev => ({ ...prev, backgroundColor: bgColor }))}
                          className="w-8 h-8 rounded border-2 border-gray-300 hover:border-blue-900 cursor-pointer"
                          style={{ backgroundColor: bgColor }}
                          title={bgColor}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Brand Guidelines */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Brand Guidelines
                  </h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div>
                      <strong className="text-blue-900">Vision:</strong> &quot;Now you know it&apos;s right.™&quot;
                    </div>
                    <div>
                      <strong className="text-blue-900">Mission:</strong> Empower small business clients with tools to foster growth of their most valuable asset, their people.
                    </div>
                    <div>
                      <strong className="text-blue-900">Current Target:</strong> {currentProfile.label} - {currentProfile.roles[config.targetRole].persona}
                    </div>
                    <div>
                      <strong className="text-blue-900">Core Services:</strong> Payroll, Time Tracking, HR Solutions, Workforce Analytics
                    </div>
                    <div>
                      <strong className="text-blue-900">Tone for {currentProfile.roles[config.targetRole].label}:</strong> Professional, {config.targetRole === 'decision_maker' ? 'authoritative, results-focused' : config.targetRole === 'champion' ? 'supportive, efficiency-focused' : config.targetRole === 'user' ? 'simple, user-friendly' : 'technical, detail-oriented'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <DesignPreview
          config={config}
          onClose={() => setShowPreview(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
};

export default DesignConfigurator;