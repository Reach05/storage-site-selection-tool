// next.config.mjs

/** @type {import('next').NextConfig} */
export default {
  // 1) Redirect "/" to "/map-view"
  async redirects() {
    return [
      {
        source: "/",
        destination: "/map-view",
        permanent: false, // use `false` so that this is a 307-style redirect
      },
    ];
  },

  // 2) Allow your LAN host so DevServer assets won’t be blocked by CORS
  //    (i.e. http://10.211.55.7:3000 in your case)
  allowedDevOrigins: ["http://10.211.55.7:3000"],
};
