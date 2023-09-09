import React from 'react'
import '../../assets/scss/modal.scss';

function Personal_agree() {
  return (
      <table className='mytable'>
        <tr className='title'>
            <th>목적</th>
            <th>항목</th>
        </tr>
        <tr>
            <td>서비스 이용에 따른 본인 식별/인증 절차, 서비스 가입/변경 처리</td>
            <td>성명, 연계정보(CI) & 중복확인정보(DI), 아이디, 패스워드,  성별, 생년월일 </td>
        </tr>
        <tr>
            <td>고지사항전달, 서비스제공관련 안내, 본인 의사 확인, 이용관련 문의 불만 처리, 서비스 품질제고를 위한 인구통계학적분석(연령/성별/지역분석 등) 및 이용 형태/선호도 분석, kt가 제공하는 고객혜택 정보 안내</td>
            <td>성명, 성별, 생년월일,  이메일주소</td>
        </tr>
        <tr>
            <td>관련 법률에 따르거나 서비스 이용 또는 업무처리 과정에서 생성되어 수집/이용</td>
            <td>이용시간/이용기록, 접속로그, 이용컨텐츠, 쿠키, 접속IP 정보, 결제기록, 이용정지기록 등 서비스 이용정보</td>
        </tr>
      </table>
  )
}

export default Personal_agree
