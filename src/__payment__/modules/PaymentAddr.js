import React, { useState, useCallback } from "react";

const PaymentAddr = () => {

    const [payment, setPayment ] = useState({})

    const [ address, setAddress ] = useState({
        rcvAddr : `${postcode} ${addr} ${extraAddr}`+` `+fullAddr
    })
    const { fullAddr } = payment 

    const [ addr, setAddr ] = useState('')
    const [ extraAddr, setExtraAddr ] = useState('')
    const [ postcode, setPostcode ] = useState('')
    
    // const payment = rcvAddr

    const onChangeAddr = useCallback(e => {
        setAddress({...address, [e.target.name]: e.target.value})
      })
    
    const execPostCode = () => {
      new window.daum.Postcode({
        oncomplete: data => {
  
          setPostcode(data.zonecode)
  
          if(data.userSelectedType === "R"){
            setAddr(data.roadAddress)
            if (data.buildingName !== ""){
              setExtraAddr(" (" + data.buildingName + ")")
            }
          }else{
            setExtraAddr(data.jibunAddress)
          }
      }
      }).open();
    };

    return(<>
            <div className="billing-info mb-20">
                <label>Address</label> <button onClick={ execPostCode }>주소 검색</button>
                <input type="text" value={`${postcode} ${addr} ${extraAddr}`} readOnly onChange = {onChangeAddr}/>
                <input type="text" placeholder="받으시는 분의 상세 주소를 입력하세요" name="fullAddr" value={fullAddr}
                onChange = {onChangeAddr} />
            </div>
    </>)
}
export default PaymentAddr