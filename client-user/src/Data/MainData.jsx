const MainData = {
  header: {
    logo: "https://png.pngtree.com/png-clipart/20230819/original/pngtree-random-dice-icon-isometric-vector-picture-image_8043755.png",
    contactOptions: [
      //   { label: "Emergency", number: "XX00" },
      { label: "CodeNetra", number: "1800 XXX XXX" },
    ],
    appName: "CodeNetra",
    languages: [
      { code: "en", name: "English" },
      { code: "ar", name: "Arabic" },
      { code: "fr", name: "French" },
      { code: "de", name: "German" },
      { code: "zh-CN", name: "Chinese" },
    ],
  },

  footer: {
    appName: "CodeNetra",
    socialLinks: [
      { href: "#", icon: "fab fa-facebook-f" },
      { href: "#", icon: "fab fa-twitter" },
      { href: "#", icon: "fab fa-instagram" },
      {
        href: "https://www.linkedin.com/in/akash-mishra-2b2348224",
        icon: "fab fa-linkedin",
      },
    ],
    footerSections: [
      {
        title: "CodeNetra",
        content: <p className="text-sm">App detail.</p>,
      },
      {
        title: "Products",
        links: ["Product 1"],
      },
      {
        title: "Useful Links",
        links: ["Pricing"],
      },
      {
        title: "Contact",
        content: (
          <ul>
            {[
              { icon: "fas fa-home", text: "" },
              { icon: "fas fa-envelope", text: "ai.akash.mishra@gmail.com" },
              { icon: "fas fa-phone", text: "" },
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <i className={item.icon}></i>
                <span className="text-sm">{item.text}</span>
              </li>
            ))}
          </ul>
        ),
      },
    ],
  },
};

export default MainData;
