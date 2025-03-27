import { authService } from '../../lib/authServices';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import HeroImage from '../../assets/imgLandingUser/HeroImage.png';
import Section1Img1 from '../../assets/imgLandingUser/section1Img1.png';
import Section1Img2 from '../../assets/imgLandingUser/section1Img2.png';
import Section1Img3 from '../../assets/imgLandingUser/section1Img3.png';
import section3Img1 from "../../assets/imgLandingUser/section3Img1.png"

import { Star, DollarSign, ArrowUpDown, ThumbsUp } from "lucide-react"
import { Card } from "../../components/ui/card"

export default function LandingPage() {
  const userType = authService.getUserType();
  const navigate = useNavigate();

  if (userType !== 'user') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Create Your Brand Identity with AI
            </h1>
            <p className="text-gray-700 md:text-lg">
              Build a powerful brand identity aligned with market trends in minutes with our automated analysis and data mining system.
            </p>
            <div>
              <Button
                onClick={() => navigate('/dashboard/createProject')}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors"
              >
                Get Started
              </Button>
            </div>
          </div>
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative w-full max-w-md h-64 md:h-80">
                <img
                  src={HeroImage}
                  alt="AI Brand Identity Illustration"
                  className="object-contain"
                />
              </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 mt-10 lg:mt-0">With Our Platform You Can</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full md:w-1/2 h-48 md:h-64 relative rounded-lg overflow-hidden">
              <img src={Section1Img1} alt="Understand Your Audience" className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Understand Your Audience and Customize Your Brand</h3>
              <p className="text-gray-700">
                Our platform helps you precisely define your ideal audience by analyzing behaviors, preferences, and key data. Use this information to create a brand identity that resonates perfectly with your customers and maximizes your market impact.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-6 items-center md:items-start">
            <div className="w-full md:w-1/2 h-48 md:h-64 relative rounded-lg overflow-hidden">
              <img src={Section1Img2} alt="Get Insights" className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Get Insights and Manage Easily</h3>
              <p className="text-gray-700">
                With the help of our AI, you'll receive personalized recommendations to optimize your brand. Analyze trends, compare with competitors, and make data-driven decisions from an intuitive interface that simplifies your strategy management.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-full md:w-1/2 h-48 md:h-64 relative rounded-lg overflow-hidden">
              <img src={Section1Img3} alt="Design and Optimize" className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Design and Optimize Your Brand</h3>
              <p className="text-gray-700">
                Access advanced design tools to create visual elements and messages aligned with your brand. Continuously optimize your branding strategy based on metrics and market feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Card className="container mx-auto px-4 py-12 md:py-20 bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-6">
            <h2 className="text-2xl md:text-3xl font-bold  mb-6">It's That Easy to Optimize Your Brand</h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Configure Your Brand:</span> Customize the fundamental aspects of your corporate identity, such as mission, vision, values, and visual preferences.
                </p>
              </li>

              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Analyze and Learn:</span> Use AI to analyze your market, audience, and competition, obtaining actionable insights in real-time.
                </p>
              </li>

              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Design and Manage:</span> Access advanced design tools to create visual elements and key messages aligned with your brand.
                </p>
              </li>

              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Monitor and Improve:</span> Adjust your branding strategy based on metrics, trends, and market feedback, constantly optimizing your corporate identity.
                </p>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0 grid grid-cols-2 gap-4 h-full">
            <div className="bg-orange-500 rounded-b-lg flex items-center justify-center p-4 aspect-[6/4]">
              <Star className="w-12 h-12 text-orange-200 fill-orange-200" />
            </div>
            <div className="bg-red-800 rounded-b-lg flex items-center justify-center p-4 aspect-[2/1]">
              <DollarSign className="w-12 h-12 text-red-200" />
            </div>

            <div className="bg-red-800 rounded-xl flex items-center justify-center p-4 aspect-[6/4]">
              <ThumbsUp className="w-12 h-12 text-red-200" />
            </div>
            <div className="bg-orange-500 rounded-xl flex items-center justify-center p-4 aspect-[5/5]">
              <ArrowUpDown className="w-12 h-12 text-orange-200" />
            </div>
          </div>
        </div>
      </Card>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={section3Img1}
              alt="Person working on branding"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Benefits of Using Our Platform</h2>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Save Time and Resources</span> by automating the creation and management of your corporate identity, reducing costs and execution times.
                </p>
              </li>

              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Enhance Your Branding Strategy</span> with data-driven recommendations, keeping you one step ahead of the competition.
                </p>
              </li>

              <li className="flex items-start">
                <span className=" mr-2 text-orange-500">•</span>
                <p className="text-sm md:text-base text-gray-700">
                  <span className="font-medium">Customize Your Brand</span> according to your target audience's preferences, ensuring consistency at every touchpoint.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Grow Your Brand Today!
          </h1>
          <p className="text-gray-700">
            Take your branding to the next level with automated technology. 
            Sign up now and redefine your corporate identity in just a few steps.
          </p>
          <Button onClick={() => navigate('/dashboard/createProject')} className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md transition-colors">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
