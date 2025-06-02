// pages/index.jsx
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/map-view",
      permanent: false, // 307 redirect
    },
  };
}

export default function Index() {
  return null; // this component never actually renders
}
