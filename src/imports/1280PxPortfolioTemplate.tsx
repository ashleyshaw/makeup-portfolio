import svgPaths from "./svg-p751zd8tl6";
import imgImage from "figma:asset/1b00c47ef046255e030c6eb7c1be703ce950efd3.png";
import imgImagePlaceholder from "figma:asset/e9583ed8e7c789943e5fbd16d335cbaa65fdfff0.png";
import imgImagePlaceholder1 from "figma:asset/055255c6ceb49614ba6988a0223fd7e2985c0899.png";
import imgImagePlaceholder2 from "figma:asset/ef0e728c667a86a82828d813318b2123cfaba295.png";
import imgImage1 from "figma:asset/47bdbfe5b8d0e4f6a0dbd3e1cedb3cd7bdb88f23.png";
import imgImage2 from "figma:asset/377b6eb61994520b4f3ffb7d006ca39069e2b096.png";
import imgImage3 from "figma:asset/1c181206a78d4afdb16e1247c6b02fe1bb25fd2d.png";
import imgImage4 from "figma:asset/67a1be056116f9ca60b7f6eb2cf64d2532ac4925.png";
import imgImage5 from "figma:asset/9d5a1ba2e4ffb3716eae40c4439712307a60047b.png";
import imgImage6 from "figma:asset/f9b2767a595b1f70eba9ec25dfbd7ac52dbaf28b.png";

function NavNavMenu() {
  return (
    <div
      className="absolute contents font-['Epilogue:Regular',_sans-serif] font-normal leading-[0] right-[50px] text-[#2d2d2d] text-[17px] text-left text-nowrap top-1/2 translate-y-[-50%]"
      data-name="nav / nav menu"
    >
      <div className="absolute flex flex-col justify-center right-[311px] top-1/2 translate-x-[100%] translate-y-[-50%]">
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          About
        </p>
      </div>
      <a
        className="[white-space-collapse:collapse] absolute cursor-pointer flex flex-col justify-center right-[210px] top-1/2 translate-x-[100%] translate-y-[-50%]"
        href="https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-portfolio22&utm_medium=figma-samples"
      >
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Work
        </p>
      </a>
      <a
        className="[white-space-collapse:collapse] absolute cursor-pointer flex flex-col justify-center right-[119px] top-1/2 translate-x-[100%] translate-y-[-50%]"
        href="https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-portfolio22&utm_medium=figma-samples"
      >
        <p className="block leading-[28px] text-nowrap whitespace-pre">
          Contact
        </p>
      </a>
    </div>
  );
}

function Logo() {
  return (
    <div
      className="absolute h-[30px] left-[50px] top-1/2 translate-y-[-50%] w-[49px]"
      data-name="Logo"
    >
      <div className="absolute flex flex-col font-['Epilogue:SemiBold',_sans-serif] font-semibold inset-0 justify-center leading-[0] text-[#2d2d2d] text-[20px] text-left text-nowrap">
        <p className="block leading-[30px] whitespace-pre">
          Logo
        </p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div
      className="bg-[#ffffff] h-20 overflow-clip relative shrink-0 w-full"
      data-name="Navigation"
    >
      <NavNavMenu />
      <Logo />
    </div>
  );
}

function HeadlineSubhead() {
  return (
    <div
      className="box-border content-stretch flex flex-col font-['Epilogue:SemiBold',_sans-serif] font-semibold gap-10 items-start justify-start p-0 relative shrink-0"
      data-name="Headline + Subhead"
    >
      <div className="flex flex-col justify-center relative shrink-0 text-[20px] w-[557px]">
        <p className="block leading-[30px]">{`Branding | Image making `}</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-[80px] w-[557px]">
        <p className="block leading-[90px]">
          My awesome portfolio
        </p>
      </div>
    </div>
  );
}

function HeadlineSubhead1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left"
      data-name="Headline + Subhead"
    >
      <HeadlineSubhead />
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[557px]">
        <p className="block leading-[27px]">
          And I made it myself! Yes. In Figma with Anima
        </p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-7 items-center justify-start p-0 relative shrink-0 w-[1080px]"
      data-name="Header"
    >
      <HeadlineSubhead1 />
      <div
        className="bg-center bg-cover bg-no-repeat h-[424px] shrink-0 w-[495px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage}')` }}
      />
    </div>
  );
}

function Header1() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-full"
      data-name="Header"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[100px] relative w-full">
          <Header />
        </div>
      </div>
    </div>
  );
}

function ImagePlaceholder() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat shrink-0 size-[130px]"
      data-name="Image placeholder"
      style={{
        backgroundImage: `url('${imgImagePlaceholder}')`,
      }}
    />
  );
}

function HeadlineSubhead2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[19px] items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-center"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[27px] w-[249.899px]">
        <p className="block leading-[42px]">Product design</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[249.899px]">
        <p className="block leading-[27px]">
          This is a template Figma file, turned into code using
          Anima. Learn more at AnimaApp.com
        </p>
      </div>
    </div>
  );
}

function Skill() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-14 items-center justify-start p-0 relative shrink-0"
      data-name="Skill"
    >
      <ImagePlaceholder />
      <HeadlineSubhead2 />
    </div>
  );
}

function Skill1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-14 items-center justify-start p-0 relative shrink-0"
      data-name="Skill"
    >
      <Skill />
    </div>
  );
}

function ImagePlaceholder1() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat shrink-0 size-[130px]"
      data-name="Image placeholder"
      style={{
        backgroundImage: `url('${imgImagePlaceholder1}')`,
      }}
    />
  );
}

function HeadlineSubhead3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[19px] items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-center"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[27px] w-[249.899px]">
        <p className="block leading-[42px]">Art direction</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[249.899px]">
        <p className="block leading-[27px]">
          This is a template Figma file, turned into code using
          Anima. Learn more at AnimaApp.com
        </p>
      </div>
    </div>
  );
}

function Skill2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-14 items-center justify-start p-0 relative shrink-0"
      data-name="Skill"
    >
      <ImagePlaceholder1 />
      <HeadlineSubhead3 />
    </div>
  );
}

function Skill3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[54px] items-center justify-start p-0 relative shrink-0"
      data-name="Skill"
    >
      <Skill2 />
    </div>
  );
}

function ImagePlaceholder2() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat shrink-0 size-[130px]"
      data-name="Image placeholder"
      style={{
        backgroundImage: `url('${imgImagePlaceholder2}')`,
      }}
    />
  );
}

function HeadlineSubhead4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[19px] items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-center"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[27px] w-[249.899px]">
        <p className="block leading-[42px]">Visual design</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[249.899px]">
        <p className="block leading-[27px]">
          This is a template Figma file, turned into code using
          Anima. Learn more at AnimaApp.com
        </p>
      </div>
    </div>
  );
}

function Skill4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-14 items-center justify-start p-0 relative shrink-0"
      data-name="Skill"
    >
      <ImagePlaceholder2 />
      <HeadlineSubhead4 />
    </div>
  );
}

function Skill5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-14 items-center justify-start p-0 relative shrink-0"
      data-name="Skill"
    >
      <Skill4 />
    </div>
  );
}

function Skills() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[125px] items-start justify-start p-0 relative shrink-0"
      data-name="Skills"
    >
      <Skill1 />
      <Skill3 />
      <Skill5 />
    </div>
  );
}

function SkillsSection() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-full"
      data-name="Skills Section"
    >
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-[140px] py-[180px] relative w-full">
          <Skills />
        </div>
      </div>
    </div>
  );
}

function HeadlineSubhead5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left w-[315px]"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-[315px]">
        <p className="block leading-[30px]">Free Bird</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[315px]">
        <p className="block leading-[27px]">Lynyrd Skynyrd</p>
      </div>
    </div>
  );
}

function WorkCard() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0"
      data-name="Work card"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-[315px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage1}')` }}
      />
      <HeadlineSubhead5 />
    </div>
  );
}

function HeadlineSubhead6() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left w-[315px]"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-[315px]">
        <p className="block leading-[30px]">Purple Haze</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[315px]">
        <p className="block leading-[27px]">Jimi Hendrix</p>
      </div>
    </div>
  );
}

function WorkCard1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0"
      data-name="Work card"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-[315px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage2}')` }}
      />
      <HeadlineSubhead6 />
    </div>
  );
}

function HeadlineSubhead7() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left w-[315px]"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-[315px]">
        <p className="block leading-[30px]">
          You Really Got Me
        </p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[315px]">
        <p className="block leading-[27px]">The Kinks</p>
      </div>
    </div>
  );
}

function WorkCard2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0"
      data-name="Work card"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-[315px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
      <HeadlineSubhead7 />
    </div>
  );
}

function Stripe1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[67.5px] items-start justify-start p-0 relative shrink-0"
      data-name="Stripe 1"
    >
      <WorkCard />
      <WorkCard1 />
      <WorkCard2 />
    </div>
  );
}

function HeadlineSubhead8() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left w-[315px]"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-[315px]">
        <p className="block leading-[30px]">American Girl</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[315px]">
        <p className="block leading-[27px]">Tom Petty</p>
      </div>
    </div>
  );
}

function WorkCard3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0"
      data-name="Work card"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-[315px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage4}')` }}
      />
      <HeadlineSubhead8 />
    </div>
  );
}

function HeadlineSubhead9() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left w-[315px]"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-[315px]">
        <p className="block leading-[30px]">Whole Lotta Love</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[315px]">
        <p className="block leading-[27px]">Led Zeppelin</p>
      </div>
    </div>
  );
}

function WorkCard4() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0"
      data-name="Work card"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-[315px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage5}')` }}
      />
      <HeadlineSubhead9 />
    </div>
  );
}

function HeadlineSubhead10() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start leading-[0] p-0 relative shrink-0 text-[#2d2d2d] text-left w-[315px]"
      data-name="Headline & Subhead"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[20px] w-[315px]">
        <p className="block leading-[30px]">{`Under Pressure `}</p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[315px]">
        <p className="block leading-[27px]">Queen</p>
      </div>
    </div>
  );
}

function WorkCard5() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[25px] items-start justify-start p-0 relative shrink-0"
      data-name="Work card"
    >
      <div
        className="bg-center bg-cover bg-no-repeat shrink-0 size-[315px]"
        data-name="Image"
        style={{ backgroundImage: `url('${imgImage6}')` }}
      />
      <HeadlineSubhead10 />
    </div>
  );
}

function Stripe2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[67.5px] items-start justify-start p-0 relative shrink-0"
      data-name="Stripe 2"
    >
      <WorkCard3 />
      <WorkCard4 />
      <WorkCard5 />
    </div>
  );
}

function WorkCards() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[60px] items-center justify-start p-0 relative shrink-0"
      data-name="Work cards"
    >
      <Stripe1 />
      <Stripe2 />
    </div>
  );
}

function LatestWorkSection() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-full"
      data-name="Latest work Section"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center justify-start px-[100px] py-5 relative w-full">
          <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#2d2d2d] text-[32px] text-center text-nowrap">
            <p className="block leading-[42px] whitespace-pre">
              My latest work
            </p>
          </div>
          <WorkCards />
        </div>
      </div>
    </div>
  );
}

function FooterMessage() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-start justify-start p-0 relative shrink-0 text-[#2d2d2d] text-left"
      data-name="Footer message"
    >
      <div className="font-['Epilogue:SemiBold',_sans-serif] font-semibold relative shrink-0 text-[32px] w-[360px]">
        <p className="block leading-[42px]">
          Let’s work together
        </p>
      </div>
      <div className="font-['Epilogue:Regular',_sans-serif] font-normal relative shrink-0 text-[17px] w-[360px]">
        <p className="block leading-[27px]">
          This is a template Figma file, turned into code using
          Anima. Learn more at AnimaApp.com This is a template
          Figma file, turned into code using Anima. Learn more
          at AnimaApp.com
        </p>
      </div>
    </div>
  );
}

function Nstagram() {
  return (
    <a
      className="[grid-area:1_/_1] block ml-[147px] mt-0 relative size-9"
      data-name="nstagram"
      href="https://www.instagram.com/animaapp/?hl=en"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="nstagram">
          <g id="Vector">
            <path
              d={svgPaths.p16336c00}
              fill="var(--fill-0, black)"
            />
            <path
              d={svgPaths.p2f828700}
              fill="var(--fill-0, black)"
            />
            <path
              d={svgPaths.pd3f7b80}
              fill="var(--fill-0, black)"
            />
          </g>
        </g>
      </svg>
    </a>
  );
}

function Behance() {
  return (
    <a
      className="[grid-area:1_/_1] block ml-[196px] mt-0 relative size-9"
      data-name="behance"
      href="https://www.behance.net/Anima_design"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="behance">
          <path
            d={svgPaths.p2b739880}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </a>
  );
}

function Dribbble() {
  return (
    <a
      className="[grid-area:1_/_1] block ml-[98px] mt-0 relative size-9"
      data-name="dribbble"
      href="https://dribbble.com/animaapp"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="dribbble">
          <path
            d={svgPaths.p328ab100}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </a>
  );
}

function Facebook() {
  return (
    <a
      className="[grid-area:1_/_1] block ml-[49px] mt-0 relative size-9"
      data-name="facebook"
      href="https://www.facebook.com/animaapp/"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="facebook">
          <path
            d={svgPaths.p39bdfa80}
            fill="var(--fill-0, black)"
            id="Vector"
          />
        </g>
      </svg>
    </a>
  );
}

function Discord() {
  return (
    <a
      className="[grid-area:1_/_1] block ml-0 mt-0 relative size-9"
      data-name="discord"
      href="https://discord.com/invite/eQxkYTNxSp"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 36 36"
      >
        <g id="discord">
          <g id="Vector">
            <path
              d={svgPaths.p183dc40}
              fill="var(--fill-0, black)"
            />
            <path
              d={svgPaths.pcbf2600}
              fill="var(--fill-0, black)"
            />
          </g>
        </g>
      </svg>
    </a>
  );
}

function SocialIcons() {
  return (
    <div
      className="cursor-pointer grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
      data-name="Social icons"
    >
      <Nstagram />
      <Behance />
      <Dribbble />
      <Facebook />
      <Discord />
    </div>
  );
}

function ContactInfo() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[60px] items-start justify-start leading-[0] p-0 relative shrink-0"
      data-name="Contact info"
    >
      <FooterMessage />
      <SocialIcons />
    </div>
  );
}

function TextInputDesktop() {
  return (
    <div
      className="bg-[#f3f3f3] box-border content-stretch flex flex-row gap-2.5 items-start justify-start px-[30px] py-[21px] relative shrink-0 w-[530px]"
      data-name="Text input/Desktop"
    >
      <div className="basis-0 font-['Epilogue:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#2d2d2d] text-[17px] text-left">
        <p className="block leading-[27px]">Name</p>
      </div>
    </div>
  );
}

function TextInputDesktop1() {
  return (
    <div
      className="bg-[#f3f3f3] box-border content-stretch flex flex-row gap-2.5 items-start justify-start px-[30px] py-[21px] relative shrink-0 w-[530px]"
      data-name="Text input/Desktop"
    >
      <div className="basis-0 font-['Epilogue:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#2d2d2d] text-[17px] text-left">
        <p className="block leading-[27px]">Email</p>
      </div>
    </div>
  );
}

function TextInputDesktop2() {
  return (
    <div
      className="bg-[#f3f3f3] box-border content-stretch flex flex-row gap-2.5 items-start justify-start px-[30px] py-[21px] relative shrink-0 w-[530px]"
      data-name="Text input/Desktop"
    >
      <div className="basis-0 font-['Epilogue:Regular',_sans-serif] font-normal grow leading-[27px] min-h-px min-w-px relative shrink-0 text-[#2d2d2d] text-[17px] text-left">
        <p className="block mb-0">Type your message here</p>
        <p className="block mb-0">&nbsp;</p>
        <p className="block mb-0">&nbsp;</p>
        <p className="block mb-0">&nbsp;</p>
        <p className="block mb-0">&nbsp;</p>
        <p className="block mb-0">&nbsp;</p>
        <p className="block">&nbsp;</p>
      </div>
    </div>
  );
}

function TextFields() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative shrink-0"
      data-name="Text fields"
    >
      <TextInputDesktop />
      <TextInputDesktop1 />
      <TextInputDesktop2 />
    </div>
  );
}

function Button() {
  return (
    <div
      className="bg-[#2d2d2d] box-border content-stretch flex flex-row gap-2.5 items-start justify-start px-[82px] py-[25px] relative shrink-0"
      data-name="Button"
    >
      <div className="flex flex-col font-['Epilogue:SemiBold',_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[20px] text-center text-nowrap">
        <p className="block leading-[30px] whitespace-pre">
          Submit
        </p>
      </div>
    </div>
  );
}

function TextFields1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-10 items-start justify-start p-0 relative shrink-0"
      data-name="Text fields"
    >
      <TextFields />
      <Button />
    </div>
  );
}

function FooterInfo() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-[190px] items-start justify-start p-0 relative shrink-0"
      data-name="Footer info"
    >
      <ContactInfo />
      <TextFields1 />
    </div>
  );
}

function FooterInfo1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[70px] items-center justify-start pb-0 pt-[70px] px-0 relative shrink-0"
      data-name="Footer info"
    >
      <div
        aria-hidden="true"
        className="absolute border-[2px_0px_0px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none"
      />
      <FooterInfo />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-full"
      data-name="Footer"
    >
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start pb-[70px] pt-0 px-[100px] relative w-full">
          <FooterInfo1 />
        </div>
      </div>
    </div>
  );
}

export default function Component1280PxPortfolioTemplate() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="1280px - Portfolio template"
    >
      <Navigation />
      <Header1 />
      <SkillsSection />
      <LatestWorkSection />
      <Footer />
    </div>
  );
}