import dynamic from "next/dynamic";

const OtherInformation = dynamic(
  () => import("@/component/OtherInformation/OtherInformation"),
  {
    ssr: false,
  }
);

export default function OtherInformationPage() {
  return <OtherInformation />;
}
