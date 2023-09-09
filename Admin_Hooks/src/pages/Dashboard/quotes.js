const quotes = [
    `분야에서 당신이 보이는 실적과 기여, 해법 같은 것들 말이다. 하지만 일단 리더가 되고 나면
    그 사람의 성공은 다른 사람을 어떻게 키우느냐에 좌우된다. 리더의 성공은 그 사람이 뭘 하느
    냐가 아니라 그가 이끄는 팀이 어떤 성과를 내느냐에 달려있다.
    - 잭 웰치 GE 전 회장`,
    `리더가 반드시 기억해야 할 원칙이 있다. 스스로 공로를 세우려 하거나 ‘금메달’을 따려고 하
    지 말라는 것이다. 사실 구체적으로 보이는 공로는 작은 것에 지나지 않는다. 리더는 작은 공로
    에 연연하지 말고 ‘금메달리스트’를 기르고 ‘단체 금메달’을 따는 등 큰 공로를 세우는데 주력해
    야 한다.
    - ‘노자처럼 이끌고 공자처럼 행하라’에서`,
    `보스는 두려움을 만들고, 리더는 확신을 창조한다. 보스는 비난을 돌리고, 리더는 잘못을 바
    로잡는다. 보스는 모든 것을 알고 있고, 리더는 질문을 한다. 보스는 일을 힘들게 만들고, 리더
    는 흥미롭게 만든다. 보스는 자신에게만 관심을 가지고, 리더는 조직에 관심을 가진다.
    - 러셀 유잉(Russel H. Ewing)`,
    `오케스트라를 지휘하는 지휘자는 자기는 정작 아무 소리도 내지 않습니다. 그는 얼마나 다른
    이들로 하여금 소리를 잘 내게 하는가에 따라 능력을 평가받습니다. 다른 이들 속에 잠자고 있
    는 가능성을 깨워서 꽃피게 해주는 것이 바로 리더십 아니겠습니까?
    - 보스턴 필 하모닉, 지휘자 벤 젠더`,
    `가장 훌륭한 성과를 거두는 사람은 가장 뛰어난 독불장군이 아니다. 오히려 동료의 두뇌와 재
    능을 최대한 활용하는 사람이다.
    - 알톤 존스, CITGO 회장`,
    `가장 유능한 리더는 하고자 하는 바를 수행하는 뛰어난 자질의 사람들을 발굴하여 옆에 둘
    수 있는 탁월한 감각을 지닌 사람이다. 또한 사람들이 맡은 일을 수행하고 있을 때, 그들이 무슨
    일을 하든 간섭하지 않는 충분한 자기 절제력을 지닌 사람이다.
    - 시어도어 루즈벨트 대통령`,
    `리더십에 대한 토론은 보통 능력과 경쟁에 대한 이야기로 시작되지만, 반드시 한 개인의 인격
    과 성실성에 대한 이야기를 하는 것으로 끝이 난다. 강한 생존력과 최저의 이직률, 그리고 근면
    함을 자랑하는 직원이 종사하는 성공적인 기업들은 분명히 눈에 보이지 않는 무언가를 갖고 있
    다.
    론 시몬스`,
    `훌륭한 지도자는 아랫사람들이 큰일을 할 수 있도록 동기를 부여하는 사람이다. 그리고 자기
    가 임무를 완성 했을 때, 백성들 입에서 ‘마침내 우리가 이 일을 해냈다.’고 자랑스럽게 말할 수
    있도록 하는 사람이다.
    - 노자`,
    `리더는 다른 사람을 최우선시 함으로써 맨 앞에 설 자격을 얻는다. 다른 사람을 자극하는 것
    이 리더의 주된 임무이다. 다른 사람들이 최고가 되지 않고서는 리더 역시 최고가 될 수 없다.
    -켄 제닝스 & 존슈탈 베르트`,
    `유능한 리더는 사랑받고 칭찬받는 사람이 아니다. 그는 그를 따르는 사람들이 올바른 일을 하
    도록 하는 사람이다. 인기는 리더십이 아니다. 리더십은 성과다.
    - 피터 드러커`,
    `못된 지도자는 백성들이 경멸하는 사람이요. 뛰어난 지도자는 백성들이 존경하는 사람이다.
    위대한 지도자는 백성들이 ‘아무나 할 수 없는 일을 했다’고 말하는 사람이다.
    - 노자 (老子)`,
    ` 리더십 개발이 중요하다. 그러나 그보다 결과가 더 중요하다. 인적 자원에 대한 투자도 중요
    하다. 하지만 그보다 결과가 더 중요하다. 책임도 중요하다. 그러나 그보다 결과가 더 중요하다.
    - 워렌 베니스`,
    `경영자는 시간을 알려주는 사람이 아니라, 시계를 만드는 사람이다. 한번만 시간을 알려주는
    사람보다는, 그가 죽은 후에도 계속 시간을 가르쳐 줄 수 있는 시계를 만드는 사람이 훨씬 가치
    있는 일을 하는 사람이다. 뛰어난 아이디어를 가졌거나 카리스마적인 지도자가 되는 것은 ‘시
    간을 알려주는 것’이고, 한 개인의 일생이나 제품의 라이프 사이클을 뛰어넘어 오랫동안 번창
    할 수 있는 기업을 만드는 것은 ‘시계를 만드는 것’이다.
    - 짐 콜린스, Built to Last`,
    `리더로서의 능력은 개인적으로 이뤄낸 성과나 재직하고 있는 동안에 그 팀이 이뤄낸 것으로
    판단 받지 않는다. 당신의 사람들과 그 조직이 당신이 없어진 후에도 잘해내고 있는가에 의해
    측정된다.
    - 존 맥스웰`,
    `사람들은 헌신하지 않는 리더를 따르지 않는다. 헌신은 책임을 완수하기 위해 스스로 선택한
    노동시간과 자신의 능력을 개발하기 위한 노력, 그리고 동료를 위한 개인적인 희생을 포함한
    모든 부분에서 드러나는 것이다.
    - 스티븐 그렉, 에틱스(ethics) 그룹회장`,
    `사장은 모든 종업원들의 걱정을 자신이 모두 짊어지겠다는 각오를 해야 한다. 걱정하는 것이
    사장의 역할이다. 사장이 걱정 없이 여유 있는 모습을 보이는 회사는 존재할 수 없다. 사장은 항
    상 걱정하고 대책을 강구하는 것에서 보람을 느끼는 존재여야 한다.
    - 마쓰시타 고노스케, 마스시타 창업회장`,
    `CEO는 직원을 내보낸다든가, 프로젝트 지원을 중단한다든가, 공장문을 닫는 등 어려운 결정
    을 내려야 할 때가 있다. 어려운 결정을 내리면 불평도 나오고 저항도 있다. 리더가 할 일은 그
    들의 말에 귀 기울이고 자신의 입장을 명확히 설명하되 밀고 나가는 것이다. 리더란 인기상을
    타려고 경합하는 것이 아니라 앞서서 이끄는 사람이다. 공직 선거에 출마할 필요는 없다. 이미
    뽑혔기 때문이다.
    - 잭 웰치 GE 전 회장`,
    `사람을 화나게 만드는 것도 리더의 임무 중 하나다. 리더십은 인기경쟁이 아니다. 아무도 화
    나게 하지 않고, 모든 사람을 다 만족시키려고 애쓰는 것은 범인(凡人)이나 할 법한 일이다. 인
    기에 영합하는 리더는 맞설 필요가 있는 사람들에게 대항하지 못한다. 그리고 업무실적에 따라
    보수를 주지 못하고, 현 상황에 도전하는 법도 없다. 그리하여 결국 조직 내 신뢰감과 성취도를
    떨어뜨린다.
    - 콜린 파월`,
    `당신의 능력은 당신을 위해 일하는 직원들이 가진 능력 이상도 이하도 아니다. 바로 그것이다.
    - 도널드 트럼프`,
    `군자가 백성을 대할 때는 마땅히 먼저 나의 성품에 편벽된 곳을 찾아 바로잡아야 한다. 유약
    함은 강하게 고치고, 게으름은 부지런하도록 고치고, 굳센 데 치우친 것은 관대하도록 고치고,
    완만한 데 치우친 것은 위엄 있고 용맹하도록 고쳐야 한다.
    - 치현결(治縣訣)`,
    ` 사람을 사랑하되 그가 나를 사랑하지 않거든, 나의 사랑에 부족함이 없는가를 살펴보라. 사람
    을 다스리되 그가 다스림을 받지 않거든 나의 지도에 잘못이 없는가를 살펴보라. 행하여 얻음
    이 없으면 모든 것에 나 자신을 반성하라. 내가 올바를진대 천하는 모두 나에게 돌아온다.
    - 맹자`,
    `리더십이란 성실하고 고결한 성품 그 자체다. 리더십이란 잘못된 것에 대한 책임은 자신이 지
    고, 잘된 것에 대한 모든 공로는 부하에게 돌릴 줄 아는 것이다.
    - 아이젠하워 대통령`,
    ` 훌륭한 리더는 결과가 나쁠 때에는 창문 밖이 아니라 거울을 들여다보며 자신에게 책임을 돌
    리고, 성공했을 때에는 거울이 아니라 창문 밖을 내다보며 다른 사람들과 외부 요인들, 행운에
    찬사를 돌린다.
    - 짐 콜린스, ‘Good to Great’`,
    `늘 배우는 자세를 잃지 마라. 지식이란 절대로 고정되거나 완결된 것이 아니다. 배우기를 끝
    내면 리더로서의 생명도 끝난다. 리더는 결코 자신의 능력이나 지식수준에 만족해서는 안 된다.
    - 존 우든 농구감독`,
    `리더는 조직의 거울이다. 직원들은 자신들의 행동방식, 심지어 사고방식까지도 리더를 판단
    의 기준으로 삼는다. 어느 정도로 헌신적이고 얼마나 노력해야 하는지, 어느 선까지 예의를 갖
    춰야 하고 얼마만큼 정직해야 하는지 등을 모두 리더의 모습에 비춰 결정한다. 리더는 직원들
    의 인생과 성공에 큰 영향을 끼칠 수밖에 없다.
    딘 토즈볼드 & 메리 토즈볼드 ‘리더십의 심리학’에서`,
    ` 먼저 백성을 즐겁게 하고 자기가 백성의 앞장을 서면 백성에게 힘든 일을 시켜도 백성은 자신
    들의 노고를 잊고 분발한다. 즐거워하는 마음으로 앞장서서 위난에 뛰어들면 백성은 자신들의
    죽음을 생각지 않고 궐기한다. 즐겨한다는 것은 위대한 힘을 지니고 있다. 백성들을 격려하고
    분별하게 만든다.
    - 역경`,
    ` 아이젠하워 미국 대통령에게 친구가 리더십이 뭐냐고 물었다. 아이젠하워 대통령은 실을 책
    상위에 갖다 놓고 ‘당겨보라’고 했다. 그러자 실이 당겨서 팽팽해졌다. 이번엔 ‘이걸 한번 밀어
    봐’라고 했다. 아무리 해도 실은 밀리지 않았다. 아이젠하워 대통령은 리더십은 자기가 앞장서
    서 솔선수범하고 자기희생을 하는 데서 나온다는 것을 보여주었던 것이다.
    - 손병두 전 서강대 총장`,
    `행동은 말보다 훨씬 크게, 훨씬 명확하게 말한다. 직원은 상사의 타고난 관찰자이다. 상사들
    이 말하고 행동하는 모든 것들이 직원들에게 그들의 진짜 관심사, 목표, 우선 사항, 그리고 가치
    관이 무엇인지를 간접적으로 가르쳐주고, 이는 놀랄 만큼 빠르게 조직에 전파된다.
    - 이사도어 샤프(포시즌 호텔 창업자)`,
    ` 경영자는 사업에 대한 지식 때문에 월급을 받지만, 현명한 경영자는 자신이 모든 것을 알고
    있다고 생각하지 않는다. 따라서 이들은 고객과 직원, 동료들로부터 뭔가 새로운 것을 배우려고
    끊임없이 노력한다. 이에 비해 자기가 다 알고 있다고 착각하는 경영자는 듣는데 너무 인색한
    반면 말하는 데는 너무 후한 경향이 있다.
    - ‘리더십 앙상블’에서`,
    ` 태산은 흙과 돌의 좋고 나쁨을 가리지 않고 다 받아들였기 때문에 그 높음을 이루었고, 양자
    강이나 넓은 바다는 작은 시냇물도 버리지 않았기 때문에 저토록 넉넉해진 것이다.
    - 한비자`,
    ` 21세기 기업가나 정치가는 성직자에 준하는 고도의 도덕성을 가진 사람이 아니면 안 되며,
    경영자의 도덕성이 기업의 성패를 좌우한다.
    - 폴 케네디, ‘강대국의 흥망’에서`,
    ` 좋은 리더는 책임질 때는 자기 몫 이상을 지고, 공을 세웠을 때는 자기 몫 이상을 다른 사람에
    게 돌린다.
    - 아놀드 글래스노 (Arnold Glasnow)`,
    `엘리트 관료집단의 본산인 대장성에서는 노골적인 불만이 표출되었다. 다나카는 1분도 안 되
    는 취임사 한마디로 우려와 불만을 일거에 해소했다. ‘여러분은 천하가 알아주는 수재들이고,
    나는 초등학교 밖에 나오지 못한 사람입니다. 더구나 대장성 일에 대해서는 깜깜합니다. 따라서
    대장성 일은 여러분들이 하십시오. 나는 책임만 지겠습니다.’
    - 다나카 수상`,
    ` 프랑스 철학자 몽테뉴가 남미의 인디안 추장 일행을 만났을 때 일화다. 그가 ‘추장님, 당신의
    특권은 무엇입니까’라고 묻자 추장은 이렇게 답했다. ‘전쟁이 일어났을 때 맨 앞에 서는 것이지
    요.’
    - ‘명사들이 말하는 101가지 성공 비결’에서`,
    `만약 모든 게 잘못되었다면 ‘내 탓이다’, 그저 그렇다면 ‘우리가 한 일이다’, 잘되었을 때 ‘여
    러분 덕이다’라고 말할 수 있는 태도야말로 미식축구에서 승리를 거두는 데 중요한 요소다.
    - 폴 베어 브라이언트(Paul Bear Bryant)`,
    `직원들의 환심을 사는 가장 좋은 방법 중 하나가 당신의 무지나 약점을 솔직히 인정하는 일이
    다. 그럼으로써 당신에게는 전문성을 나눌 수 있는 문이 열리며 동시에 당신은 직원들의 치어
    리더이자, 후원자, 격려자가 된다.
    - 캔 블랜차드`,
    `사과는 모든 희망과 바람, 또 불안함의 가면을 벗겨낸다. 사과할 때 인간은 가장 인간다워지
    고 일상생활에서 쓰고 있던 가면을 벗고 진실한 얼굴을 하게 된다. 사과는 더 이상 약자나 패자
    의 변명이 아니라 ‘리더의 언어’로 바뀌어야 한다. 사과란 단지 잘못을 시인하고 용서를 구하는
    행위 이상의 가치를 지녔다.
    - 존 케이더(John Kador)`,
    ` 상사가 부하에게 자신의 부족함을 당당하게 표현하는 데 주저하지 말아야 한다. 리더는 접근
    하기 어려워 보여서는 안 된다. 일반적으로 사람들은 인간적인 약점을 보이면 전문성에 대한
    신뢰가 떨어질까 염려하지만 절대 그렇지 않다. 인간적 약점은 비즈니스에서 가장 저평가되고
    있는 자산이다. 이는 우리 모두가 인간이라는 점을 알게 해준다.
    - 경영컨설턴트, 키스 페라지`,
    ` 경영자의 성공 요인과 실패 요인에 대한 조사 결과 중 가장 큰 실패 요인은 다음과 같이 나타
    났다 첫째는, 다른 사람들에 대한 둔감함, 마찰, 협박, 괴롭힘이고 둘째는, 다른 사람들에 대한
    냉담함, 무관심, 거만함이었다.
    - 모건 맥콜 & 마이클 롬바드`,
    ` 나는 결코 그런 사람이 아니라고 생각하지만, 이유를 생각해 보니 짐작되는 것이 하나 있습니
    다. 그것은 부하 직원 모두가 나보다 위대하게 보였다는 것입니다. 모두 나보다 배운 것이 많고
    재능이 많은 훌륭한 사람이라는 생각이 들었습니다.
    - 사람다루는 솜씨가 능숙하다는 평에 대한 마쓰시타 고노스케의 답`,
    ` 나는 직원들을 만날 때마다 그들의 가슴에 ‘나는 존중 받고 싶다’라고 쓰인 목걸이를 차고 있
    다고 생각하고, 그들을 대한다.
    - 메리 케이 애시(Mary Kay Ash)`,
    `내가 다른 사람을 설득할 준비가 됐을 때, 내가 말하고자 하는 것이 무엇인가? 나 자신에 대
    해 생각하는데 시간의 1/3을 보내고, 상대가 말하려는 것이 무엇일까, 상대에 대해 생각하는데
    나머지 2/3을 보낸다.
    - 에이브러햄 링컨`,
    ` 신사를 알아보는 방법은 많지만 절대로 실패하지 않는 방법이 한 가지 있다. 아랫사람들을 어
    떻게 대하는가? 아녀자들에게 어떤 행동을 보이는가? 고용주는 직원을, 스승은 제자를, 장교는
    부하를, 즉 자기보다 약한 사람을 어떻게 대하는가? 하는 것이다.
    -웰링턴`,
    ` 사람들은 당신이 어떻게 기대하는가에 따라 살아나기도 하고 가라앉기도 한다. 비판적이고
    깔보는 이름표를 달아주고 부정적으로 기대하면 그에 준한 행동을 하게 되고, 부정적 반응을
    촉발하게 된다. 굳이 낙인을 찍어야 한다면 긍정적인 모습을 부각시키는 이름표를 붙여주자.
    - 커뮤니케이션 전문가, 래니 어레돈`,
    ` 대부분 리더는 사람들에게 자신이 준 점수에 따라 대한다. 직원을 보통 수준의 5라고 생각해
    5점 대우를 한다면 그들은 그에 걸맞게 행동한다. 모든 사람은 인간으로서 가치를 가지고 있다.
    존경과 존엄성을 갖고 대우받을 자격이 있다. 낮은 실적을 보상하라는 말이 아니다. 사람들은
    당신이 해준 만큼 행동한다. 10점 만점으로 그들을 대우하면 그들은 10점으로 보상할 것이다.
    - 존 맥스웰`,
    `위대한 감독은 선수들로 하여금 자신이 생각하는 것 보다 훨씬 더 우수한 선수라고 믿게 만드
    는 재주가 있다. 그는 선수들에게 자신이 그들을 믿고 있다는 사실을 알게 한다. 자기가 얼마나
    우수한지 깨달은 선수는 자신의 최고 기량에 미치지 못한 경기에 만족하지 못하게 된다.
    - 명예의 전당에 헌정된 야구선수, 레지 잭슨`,
    ` 많은 경우 당신이 무엇을 말해야 할지 알 때 보다 무엇을 물어야 할지 알 때 더 큰 영향력을
    행사할 수 있다. 자신이 말하는 동안에는 아무것도 배울 수 없다. 나는 남의 이야기를 들으면서
    많은 것을 배웠다.
    - 딜로이트 전 CEO, 짐 퀴글리(Jim Quigley)`,
    ` 대중에게 다가서는 지름길은 그들에게 혀를 내미는 것이 아니라 귀를 내미는 것이다. 내가 상
    대방에게 어떤 달콤한 말을 한다 해도, 상대방 입장에서는 자기가 말하고 싶어 하는 얘기의 절
    반만큼도 흥미롭지가 않은 법이다.
    - 칼럼리스트, 도로시 딕스`,
    `다섯 번은 왜라고 물어라. 대다수 사람들이 다섯 번의 왜라는 순차적 탐색 방법을 이용할 때
    답을 쉽게 찾아낼 수 있다. 도요타 직원들은 아래와 같이 다섯 번을 묻는다. 첫째, 왜 그런가?
    둘째, 이 정도로 괜찮은가? 셋째 무언가 빠뜨린 것은 없는가? 넷째, 당연하게 생각하는 것들이
    정말 당연한 것인가? 다섯째, 좀 더 좋은 다른 방법은 없는가?
    - 도요타 기술자, 타이이치 오노`,
    ` 어떤 결정을 내려야 할 때 가장 좋은 것은 올바른 결정이고, 다음으로 좋은 것은 잘못된 결정
    이며, 가장 나쁜 것은 아무 결정도 하지 않는 것이다.
    - 로저 엔리코`,
    ` 나쁜 결정은 딱 두 가지다. 하나는 결정의 시기를 놓치는 것이고, 다른 하나는 전에 내린 결정
    이 잘못됐음을 알면서도 바꾸지 않는 것이다.
    - 제임스 피너텔리, 유니소스 에너지사 전 회장`,
    `유능한 경영인은 결정이 아무리 힘들고 어렵더라도 결코 미루지 않는다. 실패한 결정 10개중
    8개는 판단을 잘못해서가 아니라 ‘제 때’ 결정을 못 내렸기 때문에 실패한 것이다.
    - 짐 콜린스`,
    `승패의 확률이 5할일 때에 싸움을 거는 자는 어리석다. 승률이 1, 2할일 때라면 당연히 싸움
    을 걸지 않을 테니까 문제되지 않는다. 하지만 그와 반대로 9할의 승률이 7할의 승률보다 낫다
    고 생각하지도 않는다. 이것이 포인트다. 그 이유는 승률이 9할 될 때는 모든 것이 뒤쳐지기 때
    문이다.
    - 손정의 소프트뱅크 회장`,
    ` 나는 ‘공식 P = 40-70’을 자주 사용한다. P는 성공할 가능성을 나타내며 숫자는 요구된 정보
    의 퍼센트를 나타낸다. 정보의 범위가 40-70% 사이에 들면 직감적으로 추진하라. 맞을 기회가
    40% 미만일 정도로 정보가 적으면 행동을 취하지 말라. 하지만 100% 확실한 정보를 갖게 될
    때 까지 기다릴 수만은 없다. 왜냐면 그때가 되면 너무 늦기 때문이다.
    - 콜린 파월 미국무장관`,
    ` 새로운 일은 대개 애매하고, 길 또한 꼬불꼬불해 목적지조차 알 수 없는 경우가 허다하다. 그
    렇다고 정보가 확실해질 때까지 기다리는 겁쟁이가 되었다가는 새로운 것을 할 수도 없을 뿐더
    러 다른 사람들에게 뒤쳐질 수밖에 없다. 일에 대한 확신이 서지 않을 경우, 나는 그 일의 성공
    확률이 6할에서 7할 정도이면 주저하지 않고 앞으로 나간다.
    - 다카하라 게이치로, ‘현장이 답이다’에서`,
    ` 많은 이들이 당신이 하는 일에 대해 갈채를 보내고 비난하는 사람은 별로 없다면, 당신이 잘
    못된 길을 가고 있다고 확신해도 좋다. 바보들이 동의하고 있는 일을 하는 것이기 때문이다. 많
    은 사람들이 당신을 조롱하고 무시한다면 적어도 이것 한 가지는 확신해도 좋다. 적어도 당신
    이 현명한 행동을 하고 있을 가능성이 있다는 것이다.
    - E. W. 스크립스`,
    ` 어떤 일에 대해 모든 팀원이 동의한다면 최종 결론을 미루고, 그 문제에 대해 더 깊이 이해하
    고, 이에 동의하지 않는 사람이 나타날 때 까지 시간을 가져야 한다.
    - 알프레드 슬로안 2세, 전 GM 회장 간부회의 석상에서`,
    ` 올바른 결정은 반대되는 의견이나 다른 관점의 충돌에서 생성된다. 따라서 필요한 것은 의견
    의 일치가 아니라 불일치이고, 모두의 의견이 일치한 경우라면 결정해서는 안 된다. 성과를 올
    리는 사람은 의도적으로 의견의 불일치를 만들어 내기도 한다.
    - 피터 드러커`,
    `어려운 결정을 무작정 미루는 것, 단 한 사람의 마음도 불편하지 않게 하려고 노력하는 것, 기
    여도와 상관없이 모두를 똑 같이 친절하게 대하는 것, 리더의 이런 행동 때문에 정말로 미치는
    쪽은 그 조직에서 가장 창의적이고 생산적인 사람들뿐이다.
    - 콜린 파월, 전 미국무부 장관`,
    ` 소통은 기업 경영에 있어서 매우 중요하다. 기업 내 소통의 중요성을 직관적으로 반영할 수
    있는 두 개의 숫자가 있는데 바로 두 개의 70%다. 첫 번째 70%란 기업 경영자들은 실제 70%
    의 시간을 소통을 위해 사용한다는 것이다. 두 번째 70%란 기업의 문제 중 70%는 소통의 장애
    로 야기된다는 것이다.
    - 뤄궈룽, ‘경영의 지혜’에서`,
    `어떤 지적인 바보도 사물을 더 크고, 더 복잡하고, 더 격렬하게 만들 수 있다. 하지만 그 반대
    편으로 나아가려면 약간의 천재성과 많은 용기가 필요하다. 만약 당신이 어떤 것을 단순하게
    설명할 수 없다면, 당신은 그것을 충분히 이해하지 못한 것이다.
    - 알베르트 아인슈타인`,
    `나는 내가 싫어하는 사람을 승진 시키는 걸 주저하지 않았다. 오히려 정말 뭐가 사실인지를
    말하는 반항적이고 고집 센, 거의 참을 수 없는 타입의 사람들을 항상 고대했다. 만약 우리에게
    그런 사람들이 충분히 많고 우리에게 이들을 참아낼 인내가 있다면 그 기업에 한계란 없다.
    - 토마스 왓슨 (IBM 창업자)`,
    ` 나는 건설적인 갈등을 좋아한다. 그리고 사업상의 현안에 대한 최선의 결정을 도출해내는 개
    방적이고도 진솔한 토론을 좋아한다. 만일 한 가지 아이디어가 철저히 자유롭게 이루어지는 토
    론에서 살아남지 못한다면 그것은 시장에서도 살아남지 못할 것이다.
    - 잭 웰치 GE 전회장`,
    `만일 당신이 배를 만들고 싶다면, 사람들을 불러 모아 목재를 가져오게 하고 일을 지시하고
    일감을 나눠주는 등의 일을 하지 마라! 대신 그들에게 저 넓고 끝없는 바다에 대한 동경심을 키
    워줘라.
    - 어린왕자 저자 생텍쥐페리`,
    `비전은 다른 사람들이 보지 못하는 것을 보는 것이다. 지도자의 역할은 비전을 생생하게 묘사
    하여 그를 따르는 사람들이 그 비전을 받아들여 자신의 비전으로 만들게 하는 것이다. 그래야
    조직의 모든 에너지가 같은 목표에 집중될 수 있다. 그때 비전이 실현된다.
    - 조나단 스위프트 (Jonathan Swift)`,
    ` 리더가 갖춰야 할 가장 중요한 자질 중 하나는 사업을 위에서 내려다보며 동시에 내부에서도
    볼 수 있는 균형 잡힌 안목이다. 훌륭한 리더는 15분 안에 6만 피트 상공에서 지면까지 달려갈
    수 있어야 한다. 리더가 구름 속에 너무 오래 머물러 있으면 지금 무슨 일이 일어나고 있는지 알
    수 없을 것이고, 땅에서만 있으면 미래를 예견할 수 없다.
    - 제프리 이멜트, GE 회장`,
    `작고 사소한 일은 ‘이익’이라는 기준으로 옳고 그름을 가르면 된다. 하지만 중요한 일은 단순
    한 이해득실로 의사결정을 내려서는 안 된다. 크고 중요한 일은 이해관계를 떠나 ‘무엇이 올바
    른가?’라는 기준으로 결정을 내려야 한다. 이 기준에 따라서 극단적으로 말해 회사가 망해도 괜
    찮고, 개인이 죽어도 괜찮다. 그만큼 올바른 일을 하는 것이 큰일이라고 생각한다.
    - 마스시타 고노스케`,
    ` 나는 GE가 추진하는 모든 일에 가장 열렬한 지지자가 되었다. 나는 어떤 아이디어나 메시지
    를 조직 전체에 전달하고자 할 때 한 번도 이 정도면 충분하다고 말해본 적이 없다. 나는 어떤
    중요한 아이디어가 있으면, 그것을 수년에 걸쳐 온갖 종류의 회의 때마다 수없이 반복해서 강
    조하고 또 강조했다. 나중에는 아예 신물이 날 정도였다.
    - 잭 웰치`,
    `비전이나 경영이념, 경영자의 의지를 전파하는데 첫술에 배부를 순 없다. 직원들은 최초 3-4
    번까지는 ‘또 같은 소리하네.’, 5-6회 정도 되면 ‘아무래도 중요한가 보다’라고 생각한다. 10회
    정도 되어야 경영자의 본심이 제대로 전달되어 반응을 보이게 된다.
    - 니이하라 히로아키, ‘기업성공 6가지 핵심조건’에서`,
    `지난 가을 조금 풍년이 들어 백성의 식량이 약간 넉넉해졌기에 내가 밤낮 걱정할 일이 조금
    줄었다고 할 수 있다. 그러나 불안한 생각은 기근이 든 해보다도 도리어 더 심하도다. 대개 인정
    이란 조금만 편안하면 소홀해지기 쉽다. 옛말에 ‘척박한 땅의 백성은 부지런하고 기름진 땅의
    백성은 게으르다’고 했는데, 나는 풍년 든 해의 백성은 게으르다고 말하겠다.
    - 정조대왕`,
    `새로운 질서를 만들어 내는 것만큼 어렵고 힘든 일은 없다. 왜냐하면 현재의 제도와 시스템으
    로 혜택을 보고 있는 모든 사람들로부터 엄청난 저항을 받을 수밖에 없기 때문이다. 그러나 한
    편 개혁을 도와줄 사람들은 새로운 질서가 가져다줄 혜택에 대한 모호한 그림밖에는 없다. 강
    력한 적과 미온적인 동지, 이것이 혁신이 성공하기 어려운 근본적인 이유이다.
    - 마키아벨리, ‘군주론’`,
    `고성과 사장들은 이익뿐만 아니라 사람에 대해서도 관심을 갖고 있었다. 중간 성적의 사장들
    은 제조에만 신경을 집중했고, 저성과 사장들은 오로지 자신의 지위에만 관심이 있었다. 고성과
    사장은 부하직원을 낙관적으로 보는 반면, 저성과 사장들은 부하직원들의 능력을 기본적으로
    불신하고 있었다.
    - 월 스트리트 저널`,
    `성과가 나쁜 기업에서는 사람이 잠자고 있다. 그 사람들이 나쁘다기 보다는 그 사람들이 시간
    을 잊을 정도로 집중할 수 있는 감동적인 일에 종사하고 있지 않기 때문에 능력을 발휘할 수 없
    는 것이다. 사람들이 몰입해서 일할 수 있도록 만드는 것이야말로 정말로 사람을 소중하게 여
    기는 것이다.
    - 니이하라 히로아키, ‘기업성공 6가지 핵심조건’에서`,
    ` 사람들은 자기가 시작단계에서부터 관여한 일은 끝까지 지지하게 된다. 상사가 아무리 면밀
    하고 논리적인 계획을 제시하더라도 직원에게 그것은 그저 명령일 뿐이다. 하지만 직원이 그
    아이디어의 시작단계에서부터 기여할 수 있도록 하면, 같은 아이디어라도 이제는 그 직원의
    ‘개인적 사명’이 되는 것이다.
    - 메리 케이 애쉬 회장`,
    ` 맨 꼭대기에 앉아서 명령만 내리려고 하지 말라. 직접 뛰어들어 일이 돌아가는 전체과정을 알
    고, 활력을 불어넣어 주면서 임무를 완수하도록 격려하고 전투 정신을 주입해 주어라. 사람들이
    좋은 일을 한다는 마음을 품게 해라.
    - 헨리 민츠버그 (Henry Mintzberg)`,
    ` 훌륭한 리더는 구성원들로 하여금 스스로 한직이 아니라 조직의 중심에서 일한다는 생각을
    갖게 한다. 즉, 구성원 개개인이 조직의 성공을 위해 중요한 일을 하고 있다고 느끼게 하는 것이
    다. 이런 분위기 속에서 사람들은 자신이 중요한 존재라고 생각하며, 일에서 의미를 찾는다.
    - 워렌 베니스`,
    ` 나는 아버지로부터 수많은 유머로 칭찬과 인정을 받았는데, 단 한 번도 지겹거나 신물이 난
    적이 없다. 그리고 그때마다 나는 반드시 해낼 수 있다는 자긍심을 가질 수 있었다.
    - 톰 피터스`,
    `불행히도 대부분의 리더들은 직원들이 잘못하고 있는 것을 알아보는 데는 천부적인 소질을
    가지고 있는 반면, 그들이 잘하고 있는 것을 알아주는 데는 인색하다. 나는 항상 리더들에게 직
    원들이 잘하고 있는 것을 찾아내는데 적어도 일주일에 한 시간씩은 투자하라고 충고한다.
    - 켄 블렌차드`,
    `가장 성공한 기업 회장에서 슈퍼마켓 말단 직원에 이르기까지 누구나 원하는 것이 있다. ‘유
    능하고 일을 가장 잘한다는 말과 더불어 그들이 기울인 노력을 남들이 알아주는 것’이다. 조금
    만 더 인정해주는 것. 그것이야말로 좋은 직원을 훌륭한 직원으로 탈바꿈시키는데 필요한 모든
    것이기도 하다.
    - 스튜어트 레빈 & 마이클 크롬 (Stuart Levine & Michael Crom)`,
    `길게 보면 가끔 속임을 당하거나 실망할 위험이 따르더라도 신뢰를 듬뿍 보내는 것이 무능하
    거나 성실하지 못하다고 생각하는 것보다 지혜롭다.
    - 워렌 베니스`,
    ` 부하를 단속하려면 먼저 자기 행실을 올바르게 가져야 한다. 자신이 올바르게 행동하면 엄명
    을 내리지 않아도 지시대로 들을 것이요. 자신이 부정한 행동을 하면 아무리 엄명을 내려도 듣
    지 않을 것이다.
    - 다산 정약용`,
    ` 리더는 삿대가 되어야 한다. 배가 수심이 얕은 곳에 걸려서 나가지 못할 때는 삿대질을 한다.
    그럴 때 고마운 것이 삿대이다. 하지만 그 위기를 벗어나 배가 순풍을 만나 쏜살같이 달릴 때,
    삿대가 배위에 나타나 이리저리 휘젓고 다니면 배 위에서 아무 일도 못한다. 배가 잘 달릴 때는
    삿대는 배 어느 한쪽에 보이지 않게 누워있어야 한다.
    - 박해조, ‘천국을 낭비하는 사람들’에서`,
    ` 누군가에게 책임을 맡기고 그를 신뢰한다는 사실을 알게 하는 것만큼 한 사람을 성장시키는
    일은 없다.
    - 부커 T. 워싱턴`,
    `좋은 최고경영자는 일상적 업무까지 일일이 통제하지 않는다. 경영자의 직무는 발전적인 업
    무체계를 수립하고 유능한 직원을 배치하며, 일이 제대로 진행되도록 정확한 방향을 설정하는
    것이다. 만일 직원이 최선을 다하도록 하기 위해 경영자가 나서서 감독해야 한다면, 이는 직원
    을 잘못 뽑았거나 업무체계에 문제가 있는 것이다.
    - 철강왕, 앤드류 카네기`,
    ` CEO는 일을 하는 사람이 아니라 나눠주는 사람이다. CEO는 책임지는 사람이 아니라 책임
    을 나눠주는 사람이다. ‘내가 다 책임질게 하라는 대로 해!’라고 하는 것은 직원을 노예로 만드
    는 것이다. 책임을 나눠줄 때 주인의식이 생기고, 일이 고역이 아니라 재미와 놀이가 된다.
    - 연세대 김형철 교수`,
    `다른 사람이 당신을 위해 해 줄 수 있는 일을 결코 자신이 하지 말라. 다른 사람이 당신을 위
    해 해 줄 수 있는 일이 늘어날수록, 당신 외에는 그 누구도 할 수 없는 일에 당신이 쏟아 부을 수
    있는 시간과 에너지도 늘어난다.
    - E. W. 스크립스`,
    `권한위양을 빙자해 책임을 회피하는 것처럼 무책임한 것이 없다. 무책임한 권한위양은 조직
    의 질서를 혼란시키고 활력을 저하시킨다. 부하에게 지울 수 있는 책임은 한정된 직무상의 책
    임에 국한되며 일의 성사, 공과에 대한 책임은 당연히 책임자가 져야 한다. 그러나 명심해야 할
    것은 권한을 위양 하여도 책임은 그대로 남는다는 책임불변(責任不變)의 원칙이다.
    - 이병철 삼성 창업회장`,
    `위대한 리더는 책임을 질 때를 제외하고는 어떤 경우에도 그의 추종자들보다 자신을 더 높은
    곳에 두지 않는다.
    - 줄 오르몽(Jules Ormont)`,
    `만일 위대한 리더가 되고 싶다면 섬기는 리더가 되어야만 한다. 우리 회사 조직은 역 피라미
    드 구조로 되어있다. 내가 가장 밑바닥에 있는데, 그것은 내가 하는 일이 바로 섬기는 일이기 때
    문이다.
    - 커브스 포 우먼 CEO 게리 헤빈`,
    `리더가 되기로 선택했을 때 우리는 다른 사람들을 위해 봉사하기로 선택한 것이다. 리더가 된
    다는 것은 다른 사람들로부터 무언가를 얻는 것이 아니라 다른 사람들이 우리들로부터 무언가
    를 얻는 것이다.
    - James M. Kouzes and Barry Z. Posner`,
    `가장 많은 학생을 가르치기보다는 가장 많은 스승을 키우는 사람이 진정한 스승이다. 가장 많
    은 추종자를 거느리기보다는 가장 많은 리더를 키우는 사람이 진정한 리더이다.
    - 닐 도널드 월시`,
    
  ];
  
  export default quotes;