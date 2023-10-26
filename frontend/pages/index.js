import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../components/ui/AppShell"), {
  ssr: false,
});

function Index() {
  return <App />;
}
export default Index;
