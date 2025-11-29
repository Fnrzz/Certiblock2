import ComponentCard from "@/components/common/ComponentCard";
import VerifyCertificate from "@/components/form/form-elements/VerifyCertificate";
import React from "react";

const page = () => {
  return (
    <div className="dark:text-white">
      <h2 className="text-xl font-semibold mb-6">Certificate Verify</h2>
      <ComponentCard title={"Input JSON"}>
        <VerifyCertificate />
      </ComponentCard>
    </div>
  );
};

export default page;
