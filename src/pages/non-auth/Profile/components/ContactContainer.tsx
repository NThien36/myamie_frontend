import React from "react";

function ContactContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-2 rounded-xl p-5 mt-7 flex flex-col gap-5 sticky top-5 bg-white">
      {children}
    </div>
  );
}

export default ContactContainer;
