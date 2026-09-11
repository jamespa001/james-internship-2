// Icons Related
import { AiFillFileText, AiFillBulb, AiFillAudio } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiCrown } from "react-icons/bi";
import { RiLeafLine } from "react-icons/ri";

// Reviews Related
import Reviews from "./components/Reviews";

// Statistics Related
import ActiveStatistics from "./components/ActiveStatistics";
import Statistics from "./components/Statistics";

// Login Related
import LoginButton from "./components/LoginButton";
import TopNav from "./components/TopNav";

// Function: Home
export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="flex h-20 w-full items-center justify-center">
        <div className="relative mx-auto flex w-full max-w-[1070px] items-center justify-between px-6">
          <figure className="max-w-[200px]">
            <img
              className="h-full w-full object-contain"
              src="/assets/images/logo.png"
              alt="logo"
            />
          </figure>
          <TopNav />
        </div>
      </nav>
      {/* Landing Section */}
      <section id="landing" className="py-12 md:py-10">
        <div className="mx-auto max-w-[1070px] px-6">
          <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
            <div className="flex max-w-[500px] flex-col items-start">
              <div className="text-[40px] leading-tight font-bold text-[#032b41] md:text-[40px]">
                Gain more knowledge <br className="hidden md:block" />
                in less time
              </div>
              <div className="mt-6 text-[20px] font-light text-[#394149] md:text-xl">
                Great summaries for busy people, <br className="none"></br>
                individuals who barely have time to read,
                <br className="none"></br> and even people who don’t like to
                read.
              </div>
              <LoginButton />
            </div>
            <figure className="w-full max-w-[420px]">
              <img
                className="h-auto w-full object-contain"
                src="/assets/images/landing.png"
                alt="landing"
              />
            </figure>
          </div>
        </div>
      </section>{" "}
      {/* Features Section */}
      <section id="features" className="bg-[#fefefe] py-6">
        <div className="mx-auto max-w-[1070px] px-6">
          <div className="mb-8 text-center text-[32px] font-bold text-[#032b41]">
            Understand books in few minutes
          </div>

          <div className="mb-10 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-4 text-6xl text-[#032b41]">
                <AiFillFileText />
              </div>
              <div className="mb-2 text-[24px] font-bold text-[#032b41]">
                Read or listen
              </div>
              <div className="text-[18px] font-light text-[#394149]">
                Save time by getting the core ideas from the best books.
              </div>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-4 text-6xl text-[#032b41]">
                <AiFillBulb />
              </div>
              <div className="mb-2 text-[24px] font-bold text-[#032b41]">
                Find your next read
              </div>
              <div className="text-[18px] font-light text-[#394149]">
                Explore book lists and personalized recommendations.
              </div>
            </div>
            <div className="flex flex-col items-center p-4 text-center">
              <div className="mb-4 text-6xl text-[#032b41]">
                <AiFillAudio />
              </div>
              <div className="mb-2 text-[24px] font-bold text-[#032b41]">
                Briefcasts
              </div>
              <div className="text-[18px] font-light text-[#4a5568] subpixel-antialiased">
                Gain valuable insights from briefcasts
              </div>
            </div>
          </div>

          {/* Statistics Block 1 */}
          <div className="mb-16 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <ActiveStatistics
                items={[
                  "Enhance your knowledge",
                  "Achieve greater success",
                  "Improve your health",
                  "Develop better parenting skills",
                  "Increase happiness",
                  "Be the best version of yourself!",
                ]}
              />
            </div>
            <Statistics page={1} count={3} />
          </div>

          {/* Statistics Block 2 */}
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <Statistics page={2} count={3} />
            <div className="order-1 flex flex-col items-end gap-2 md:order-2">
              <ActiveStatistics
                items={[
                  "Expand your learning",
                  "Accomplish your goals",
                  "Strengthen your vitality",
                  "Become a better caregiver",
                  "Improve your mood",
                  "Maximize your abilities",
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Reviews Section */}
      <section id="reviews" className="py-12 md:py-16">
        <div className="mx-auto max-w-[700px] px-6">
          <div className="mb-6 text-center text-3xl font-bold text-[#032b41]">
            What our members say
          </div>
          <div className="mx-auto mb-8 flex max-w-[600px] flex-col gap-8">
            <Reviews />
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <LoginButton />
          </div>
        </div>
      </section>
      {/* Numbers Section */}
      <section id="numbers" className="mb-6 bg-white py-2">
        <div className="mx-auto max-w-[1070px] px-6">
          <div className="mb-8 text-center text-3xl font-bold text-[#032b41]">
            Start growing with Summarist now
          </div>
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            {/* Box 1 */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-blue-50 bg-[#d7e9ff] p-8">
              <div className="mb-4 text-5xl text-[#0365f2]">
                <BiCrown />
              </div>
              <div className="mb-4 text-4xl font-bold text-[#032b41]">
                3 Million
              </div>
              <div className="mb-6 text-[#394149]">
                Downloads on all platforms
              </div>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center justify-between rounded-2xl border border-blue-50 bg-[#d7e9ff] p-8">
              <div className="mt-4 mb-8 flex gap-1 text-xl text-[#0365f2]">
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarFill />
                <BsStarHalf />
              </div>
              <div className="mb-4 text-4xl font-bold text-[#032b41]">
                4.5 Stars
              </div>
              <div className="text-[#394149]">
                Average ratings on iOS and Google Play
              </div>
            </div>

            <div className="flex flex-col items-center justify-between rounded-2xl border border-blue-50 bg-[#d7e9ff] p-8">
              <div className="mb-4 text-5xl text-[#0365f2]">
                <RiLeafLine />
              </div>
              <div className="mb-4 text-4xl font-bold text-[#032b41]">97%</div>
              <div className="text-[#394149]">
                Of Summarist members create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="bg-[#f1f6f4] pt-14 pb-8">
        <div className="mx-auto max-w-[1070px] px-6">
          <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Column 1: Actions */}
            <div>
              <div className="mb-4 font-bold text-[#032b41]">Actions</div>
              <ul className="flex flex-col gap-3 text-sm text-[#394149]">
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Summarist Magazine
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Cancel Subscription
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Useful Links */}
            <div>
              <div className="mb-4 font-bold text-[#032b41]">Useful Links</div>
              <ul className="flex flex-col gap-3 text-sm text-[#394149]">
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Summarist Business
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Gift Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Authors & Publishers
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <div className="mb-4 font-bold text-[#032b41]">Company</div>
              <ul className="flex flex-col gap-3 text-sm text-[#394149]">
                <li>
                  <a href="#" className="cursor-not-allowed">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Code of Conduct
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Other */}
            <div>
              <div className="mb-4 font-bold text-[#032b41]">Other</div>
              <ul className="flex flex-col gap-3 text-sm text-[#394149]">
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Sitemap
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Legal Notice
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="cursor-not-allowed">
                    Privacy Policies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm font-semibold text-[#032b41]">
            Copyright &copy; 2023 Summarist.
          </div>
        </div>
      </footer>
    </>
  );
}
