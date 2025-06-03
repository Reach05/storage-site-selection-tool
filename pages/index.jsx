// pages/index.jsx
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/map-view",
      permanent: false,
    },
  };
}

// This component never actually renders—it's immediately redirected.
export default function Index() {
  return null;
}
