import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar";
import { IconHome, IconUser } from "@tabler/icons-react";
import Appbar from "../components/ui/appbar";
import { useState } from "react";
import { BackgroundBeamsDemo } from "../components/ui/hero";
import LiveCourses from "../components/ui/livecourses";
import PastCourses from "../components/ui/PastCourses";
import { AnimatedTestimonialsDemo } from "../components/ui/testimnials";
import { Accordion, AccordionItem } from "../components/ui/accordion";
import Footer from "../components/ui/footer";

function Landingpage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigationLinks = [
    {
      href: "/",
      label: "Home",
      icon: <IconHome className="w-5 h-5" />,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <IconUser className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex h-screen ">
      {loggedIn ? (
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
          <SidebarBody>
            {navigationLinks.map((link, index) => (
              <SidebarLink key={index} link={link} />
            ))}
          </SidebarBody>
        </Sidebar>
      ) : null}

      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <Appbar />
          <BackgroundBeamsDemo />

          <div id="course">
            <LiveCourses />
            <PastCourses />
          </div>

          <div id="testimonial">
            <AnimatedTestimonialsDemo />
          </div>

          <div id="faq" className="bg-neutral-950 p-4">
            <p className="text-4xl font-medium leading-relaxed text-white text-center py-2">
              FAQs
            </p>
            <Accordion className="bg-neutral-950 py-20">
              <AccordionItem title="How do I join the dark side of coding?">
                <p className="text-white">
                  Simply apply and we’ll send you the exclusive spellbook on how
                  to code like a wizard.
                </p>
              </AccordionItem>
              <AccordionItem title="Is there a dress code for the classes?">
                <p className="text-white">
                  Pajamas are perfectly acceptable. After all, comfort fuels
                  creativity!
                </p>
              </AccordionItem>
              <AccordionItem title="Will this course turn me into a software wizard?">
                <p className="text-white">
                  Well, we can’t guarantee wizardry, but you’ll definitely leave
                  with more knowledge and fewer bugs!
                </p>
              </AccordionItem>
              <AccordionItem title="Do I need a magical staff or cauldron to enroll?">
                <p className="text-white">
                  Not at all! A laptop and a little bit of enthusiasm are all
                  you need.
                </p>
              </AccordionItem>
            </Accordion>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default Landingpage;
