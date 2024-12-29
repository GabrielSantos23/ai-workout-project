import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
  return (
    <div className="min-h-screen  bg-black text-white">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-500 rounded-md"></div>
          <span className="text-xl font-bold">TEW AI Workout</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Link href="#" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="#" className="hover:text-blue-400">
            Program
          </Link>
          <Link href="#" className="hover:text-blue-400">
            Pricing
          </Link>
          <Link href="#" className="hover:text-blue-400">
            Community
          </Link>
        </nav>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto mt-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            AI-powered workouts for your ideal fitness
          </h1>
          <p className="text-xl text-gray-400">
            Personalized training plans with AI optimization, progress tracking,
            and community support.
          </p>
          <div className="flex space-x-4">
            <Button size="lg">Start Training</Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src="/hero-image.png"
            alt="Fitness trainers"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Explore Our Program */}
      <section className="container mx-auto mt-32">
        <h2 className="text-3xl font-bold mb-8">Explore Our Program</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            "AI Workouts",
            "Progress Tracking",
            "Nutrition Plans",
            "Community Support",
          ].map((item, index) => (
            <Card key={index} className="bg-gray-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-blue-500 rounded-full mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">{item}</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Transform Your Physique */}
      <section className="container mx-auto mt-32 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">
            Transform your physique with our AI fitness plan
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
              Personalized workout routines
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
              AI-driven progress optimization
            </li>
            <li className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
              Nutrition guidance and meal planning
            </li>
          </ul>
          <div className="flex space-x-4">
            <Button size="lg">Start Now</Button>
            <Button size="lg" variant="outline">
              Contact us
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 grid grid-cols-2 gap-4">
          <Image
            src="/fitness-image-1.png"
            alt="Fitness exercise 1"
            width={300}
            height={200}
            className="rounded-lg"
          />
          <Image
            src="/fitness-image-2.png"
            alt="Fitness exercise 2"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto mt-32">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Pricing Plans
        </h2>
        <Tabs defaultValue="monthly" className="w-full mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
            <TabsTrigger value="yearly">Yearly Billing</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: "Basic",
              price: 25,
              features: [
                "AI Workout Generation",
                "Progress Tracking",
                "24/7 Support",
              ],
            },
            {
              name: "Pro",
              price: 55,
              features: [
                "All Basic features",
                "Nutrition Planning",
                "Video Tutorials",
                "Community Access",
              ],
            },
            {
              name: "Elite",
              price: 75,
              features: [
                "All Pro features",
                "Personal Coach",
                "Advanced Analytics",
                "Priority Support",
              ],
            },
            {
              name: "Ultimate",
              price: 105,
              features: [
                "All Elite features",
                "Custom Meal Plans",
                "1-on-1 Training",
                "Exclusive Content",
              ],
            },
          ].map((plan, index) => (
            <Card
              key={index}
              className={`${index === 1 ? "border-blue-500" : "bg-gray-800"}`}
            >
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="text-3xl font-bold">
                  ${plan.price}
                  <span className="text-lg font-normal">/mo</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={index === 1 ? "default" : "outline"}
                >
                  Choose Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto mt-32">
        <h2 className="text-3xl font-bold mb-8">
          What Our Members Say About Us?
        </h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Image
              src="/avatar.png"
              alt="User avatar"
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
            <div>
              <h4 className="font-semibold">Sarah Johnson</h4>
              <p className="text-gray-400">Fitness Enthusiast</p>
            </div>
          </div>
          <p className="text-gray-300">
            "TEW AI Workout has completely transformed my fitness journey. The
            personalized plans and AI-driven insights have helped me achieve
            results I never thought possible. Highly recommended!"
          </p>
        </div>
      </section>

      {/* Subscribe */}
      <section className="container mx-auto mt-32 bg-blue-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Subscribe to our fitness tips
        </h2>
        <p className="text-center mb-6">
          Get weekly updates on new workouts, nutrition advice, and exclusive
          content
        </p>
        <div className="flex max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="rounded-r-none"
          />
          <Button type="submit" className="rounded-l-none">
            Subscribe
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 py-8 border-t border-gray-800">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-500 rounded-md"></div>
              <span className="text-xl font-bold">TEW AI Workout</span>
            </div>
            <p className="text-gray-400">
              AI-powered fitness solutions for everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.064.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 014.84 2.526c.636-.247 1.363-.416 2.427-.465C8.252 2.013 8.602 2 11.315 2h.08zm.002 1.5h-.162c-2.507 0-2.828.013-3.806.059-.955.044-1.508.203-1.905.367a3.89 3.89 0 00-1.424.93 3.89 3.89 0 00-.93 1.424c-.164.397-.323.95-.367 1.905-.046.978-.059 1.299-.059 3.806v.162c0 2.507.013 2.828.059 3.806.044.955.203 1.508.367 1.905.223.538.515 1.03.93 1.424.395.395.887.707 1.424.93.397.164.95.323 1.905.367.978.046 1.299.059 3.806.059h.162c2.507 0 2.828-.013 3.806-.059.955-.044 1.508-.203 1.905-.367.538-.223 1.03-.515 1.424-.93.395-.395.707-.887.93-1.424.164-.397.323-.95.367-1.905.046-.978.059-1.299.059-3.806v-.162c0-2.507-.013-2.828-.059-3.806-.044-.955-.203-1.508-.367-1.905a3.89 3.89 0 00-.93-1.424 3.89 3.89 0 00-1.424-.93c-.397-.164-.95-.323-1.905-.367-.978-.046-1.299-.059-3.806-.059zm0 4.41a4.098 4.098 0 110 8.196 4.098 4.098 0 010-8.196zm0 1.5a2.598 2.598 0 100 5.196 2.598 2.598 0 000-5.196zm5.364-.545a.765.765 0 110 1.53.765.765 0 010-1.53z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
