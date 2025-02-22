import React from 'react'
import Lerniningcenter from "../../components/Lerniningcenter"
import CorePrograms from "../../components/CorePrograms"
import Comprehensive from "../../components/Comprehensive"

import Partners from 'components/Partners'
import Contact from 'components/Contact'
import EmpoweringWomen from "../../components/EmpoweringWomen"
const page = () => {
  return (
    <div>



        <Lerniningcenter/>
        <CorePrograms/>

        <Comprehensive/>
        <EmpoweringWomen/>

            <Partners />
                <Contact /> 
    </div>
  )
}

export default page