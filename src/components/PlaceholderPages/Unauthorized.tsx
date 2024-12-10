import React from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/routes/route-path";

function Unauthorized() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">403 - Unauthorized</h1>
      <p className="mt-4">You do not have permission to access this page.</p>
      <Link to={ROUTE_PATH.BUSINESS} className="mt-5 underline">
        Go to Home
      </Link>
    </div>
  );
}

export default Unauthorized;
