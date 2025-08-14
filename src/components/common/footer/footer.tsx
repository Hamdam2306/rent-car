const Footer = () => {
  return (
    <div className="w-full h-[max-content] md:py-[80px] py-[48px] md:px-[60px] px-[24px] flex flex-col gap-9 bg-[#FFFFFF] border-[1px] border-gray-50">
      <div className=" w-full flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-4 md:h-[244px] h-[110px]">
          <h4 className="text-[#3563E9] font-[700] text-[24px] md:text-[32px]">
            MORENT
          </h4>
          <p className="md:text-4 text-3 font-[500] text-[#13131399] w-[292px]">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        <div className="h-full md:w-[620px] w-[450px] grid md:grid-cols-3 grid-cols-2 gap-24">
          <ul className="text-4 font-[500] text-[#13131399] gap-6 flex flex-col">
            <li className="font-[600] text-5 text-[#1A202C]">About</li>
            <li>How it works</li>
            <li>Featured</li>
            <li>Partnership</li>
            <li>Bussiness Relation</li>
          </ul>
          <ul className="text-4 font-[500] text-[#13131399] gap-6 flex flex-col">
            <li className="font-[600] text-5 text-[#1A202C]">Community</li>
            <li>Events</li>
            <li>Blog</li>
            <li>Podcast</li>
            <li>Invite a friend</li>
          </ul>
          <ul className="text-4 font-[500] text-[#13131399] gap-6 flex flex-col">
            <li className="font-[600] text-5 text-[#1A202C]">Socials</li>
            <li>Discord</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Facebook</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="w-full hidden md:flex h-[1px] bg-[#13131329]"></div>
        <div className="w-full  font-[600] gap-8 text-4 flex flex-col md:flex-row justify-between md:pt-14 pt-0 ">
          <p className="md:order-1 order-2">
            ©2022 MORENT. All rights reserved
          </p>
          <div className=" md:order-2 order-1 flex gap-24">
            <p>Privacy & Policy</p>
            <p>Terms & Condition</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
