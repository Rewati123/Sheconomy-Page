
"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Lerniningcenter from "../components/Lerniningcenter"
import CorePrograms from "components/CorePrograms";
import Comprehensive from "components/Comprehensive";
import EmpoweringWomen from "components/EmpoweringWomen";
import Partners from "components/Partners";
import Contact from "components/Contact";


export default function Home() {
 



 


  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <Lerniningcenter/>
        <CorePrograms/>

        <Comprehensive/>
        <EmpoweringWomen/>

        <Partners />
         <Contact /> 
    </main>
  );
}
