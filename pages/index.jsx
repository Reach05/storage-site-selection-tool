// pages/index.jsx
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/map-view",
      permanent: false,   // use `true` if you want a 301
    },
  };
}

export default function Index() {
  return null; // this never actually renders
}
