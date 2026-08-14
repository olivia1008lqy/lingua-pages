// Lingua Pages — content data (separated from the app logic in index.html)
// Each lesson is a story told in `beats` (short scenes revealed one at a time),
// followed by a `scene` comprehension question before the language challenge.

const mysteryChapters = [
  {
    title:"The Door Without a Sign",
    beats:[
      "Rain poured over the quiet street as Lila searched for her new apartment. Down a narrow alley, she found an old bookstore glowing with a dim amber light.",
      "There was no sign outside—only a worn wooden door left slightly open."
    ],
    mystery:"A voice from the darkness whispered: ‘If you want to enter, name this place.’",
    scene:{ask:"What did Lila find glowing at the end of the alley?",choices:["An old bookstore","A train station","A coffee shop"],answer:"An old bookstore"},
    word:"书店", pinyin:"shū diàn", meaning:"bookstore",
    tip:"Keep <strong>shū</strong> high and level. Let <strong>diàn</strong> fall sharply, like a firm statement."
  },
  {
    title:"The Locked Notebook",
    beats:[
      "Inside, shelves climbed toward the ceiling. On a central table lay a black notebook sealed with a brass lock.",
      "An old bookseller stepped from the shadows and warned Lila that its pages held memories people had tried to forget."
    ],
    mystery:"The lock clicked once. A single word appeared across its cover in silver ink.",
    scene:{ask:"Why did the bookseller warn Lila about the notebook?",choices:["Its pages held forgotten memories","It was too expensive","The ink had faded"],answer:"Its pages held forgotten memories"},
    word:"秘密", pinyin:"mì mì", meaning:"secret",
    tip:"Both syllables use the fourth tone. Say each <strong>mì</strong> with a clear, quick downward fall."
  },
  {
    title:"The Girl in the Photograph",
    beats:[
      "The notebook opened to a faded photograph of a girl standing outside the same bookstore twenty-five years earlier. She looked exactly like Lila.",
      "Beneath it was a handwritten warning: ‘When the clock stops, do not look in the mirror.’"
    ],
    mystery:"From the back room came the slow tick of a clock—and then complete silence.",
    scene:{ask:"Why was the photograph strange?",choices:["The girl looked exactly like Lila","It was printed in color","It showed a different store"],answer:"The girl looked exactly like Lila"},
    word:"镜子", pinyin:"jìng zi", meaning:"mirror",
    tip:"Drop your voice firmly on <strong>jìng</strong>. Keep <strong>zi</strong> short, light, and unstressed."
  },
  {
    title:"The Moonlit Message",
    beats:[
      "Lila held the magic mirror near the window. Under the bright moon, silver writing appeared across the glass.",
      "The words read: ‘Find what opens the hidden gate.’"
    ],
    mystery:"A tiny golden key shape began to glow inside the mirror.",
    scene:{ask:"What did Lila see written across the glass?",choices:["A map of the city","A message about a hidden gate","An old name"],answer:"A message about a hidden gate"},
    word:"月亮", pinyin:"yuè liang", meaning:"moon",
    tip:"Let <strong>yuè</strong> fall sharply. Keep <strong>liang</strong> short, light, and unstressed."
  },
  {
    title:"The Golden Key",
    beats:[
      "The mirror guided Lila to a dusty storybook. Between its pages, she found a sparkling golden key tied with a faded pink ribbon.",
      "The key began to hum whenever Lila pointed it toward the garden wall."
    ],
    mystery:"A hidden door in the garden wall waited for its golden key.",
    scene:{ask:"Where did Lila find the golden key?",choices:["Inside an old storybook","In the garden","On a windowsill"],answer:"Inside an old storybook"},
    word:"钥匙", pinyin:"yào shi", meaning:"key",
    tip:"Let <strong>yào</strong> drop firmly. Say <strong>shi</strong> softly with a neutral tone."
  },
  {
    title:"The Secret Garden",
    beats:[
      "Lila used the golden key to open a tiny moon-shaped door.",
      "Beyond it was a magical garden filled with glowing flowers and whispering pages."
    ],
    mystery:"At its center, a new book opened by itself to a map marked ‘Cloud Castle.’",
    scene:{ask:"What lay beyond the moon-shaped door?",choices:["A magical garden","A train platform","An empty room"],answer:"A magical garden"},
    word:"花园", pinyin:"huā yuán", meaning:"garden",
    tip:"Keep <strong>huā</strong> high and level, then let <strong>yuán</strong> rise."
  }
]

const comics = [
  {title:"Coffee Before Work",cover:"☕🏙️",badge:"Morning Regular",image:"images/72752AF5-5B43-420A-8508-6D9753BE16A5.png",lesson:{word:"咖啡",pinyin:"kā fēi",meaning:"coffee",tip:"Keep <strong>kā</strong> high and level, then let <strong>fēi</strong> rise."},panels:[
    {scene:"🏙️　🧑🏻　☕",zh:"早上好。",py:"zǎo shang hǎo.",en:"Good morning."},
    {scene:"☕　➡️　🧑🏻",zh:"我要一杯咖啡。",py:"wǒ yào yì bēi kā fēi.",en:"I would like a coffee."},
    {scene:"📱　☕　✓",zh:"可以刷卡吗？",py:"kě yǐ shuā kǎ ma?",en:"Can I pay by card?"}]},
  {title:"A Client Dinner",cover:"🍽️🌃",badge:"Dinner Ready",image:"images/985391F5-6CB8-4A91-95B3-E96C400C27F8(1).png",lesson:{word:"预订",pinyin:"yù dìng",meaning:"reservation",tip:"Both syllables fall; keep each one clear and decisive."},panels:[
    {scene:"🌃　🧑🏻‍💼　🍽️",zh:"我有预订。",py:"wǒ yǒu yù dìng.",en:"I have a reservation."},
    {scene:"📖　🥢　🧑🏻‍💼",zh:"你推荐什么？",py:"nǐ tuī jiàn shén me?",en:"What do you recommend?"},
    {scene:"🧾　💳",zh:"请给我账单。",py:"qǐng gěi wǒ zhàng dān.",en:"Please give me the bill."}]},
  {title:"An Evening in the City",cover:"🚇🌆",badge:"City Navigator",image:"images/7299D884-31EE-4B51-9836-FE41169E0D51.png",lesson:{word:"地铁",pinyin:"dì tiě",meaning:"metro",tip:"Drop <strong>dì</strong>, then let <strong>tiě</strong> dip and rise."},panels:[
    {scene:"🌆　🚇　🧑🏽",zh:"地铁站在哪里？",py:"dì tiě zhàn zài nǎ lǐ?",en:"Where is the metro station?"},
    {scene:"🗺️　⬅️　🏢",zh:"一直走，然后左转。",py:"yì zhí zǒu, rán hòu zuǒ zhuǎn.",en:"Go straight, then turn left."},
    {scene:"🚇　✓　🌙",zh:"谢谢你的帮助。",py:"xiè xie nǐ de bāng zhù.",en:"Thank you for your help."}]},
  {title:"At the Airport",cover:"✈️🧳",badge:"Ready to Board",image:"images/52346D6B-FE98-405B-AE23-A106AB4394D1.png",lesson:{word:"机场",pinyin:"jī chǎng",meaning:"airport",tip:"Keep <strong>jī</strong> high and level, then let <strong>chǎng</strong> dip and rise."},panels:[
    {scene:"✈️　🧳　🧑🏽",zh:"去机场怎么走？",py:"qù jī chǎng zěn me zǒu?",en:"How do I get to the airport?"},
    {scene:"🗺️　➡️　🚕",zh:"坐出租车，大概二十分钟。",py:"zuò chū zū chē, dà gài èr shí fēn zhōng.",en:"Take a taxi, about twenty minutes."},
    {scene:"🧳　✓　✈️",zh:"谢谢，再见！",py:"xiè xie, zài jiàn!",en:"Thank you, goodbye!"}]}
]

const storyTracks = [
  {id:"mystery",icon:"🔮",title:"Moonlit Mystery",description:"Unlock the secrets of an enchanted bookstore.",lessons:mysteryChapters},
  {id:"cafe",icon:"🥮",title:"Mooncake Café",description:"Practice greetings, ordering, numbers, and everyday kindness.",lessons:[
    {title:"A New Customer",beats:[
      "The bell chimed as Mei entered the Mooncake Café. The owner smiled and waited for her first words.",
      "Behind the counter, a chalkboard listed the day’s specials in Chinese."],
     mystery:"Greet the owner to receive the secret menu.",
     scene:{ask:"What was written on the chalkboard?",choices:["The day’s specials","A phone number","The shop address"],answer:"The day’s specials"},
     word:"你好",pinyin:"nǐ hǎo",meaning:"hello",tip:"Let <strong>nǐ</strong> dip, then let <strong>hǎo</strong> dip and rise."},
    {title:"Choose a Drink",beats:[
      "A tiny teapot floated above the counter. It would only pour for someone who named the drink politely.",
      "Mei studied the labels: tea, coffee, juice, and water."],
     mystery:"Order the tea to reveal a message at the bottom of the cup.",
     scene:{ask:"What did the teapot do?",choices:["It poured only when someone named the drink","It was empty","It played music"],answer:"It poured only when someone named the drink"},
     word:"茶",pinyin:"chá",meaning:"tea",tip:"Let <strong>chá</strong> rise, as if you are asking a friendly question."},
    {title:"The Pink Box",beats:[
      "Three mooncakes glowed inside a pink box, but one belonged to a mysterious guest.",
      "The owner asked Mei to count them before the lid closed."],
     mystery:"Count the mooncakes before the box closes.",
     scene:{ask:"How many mooncakes were in the box?",choices:["Three","Two","Five"],answer:"Three"},
     word:"三个",pinyin:"sān ge",meaning:"three items",tip:"Keep <strong>sān</strong> high and level; say <strong>ge</strong> lightly."},
    {title:"A Thank-you Note",beats:[
      "The guest left a silver envelope for Mei. Inside was a note and a tiny café key.",
      "The note read: ‘Say thank you to the owner, and the door will open.’"],
     mystery:"Say thank you to complete the café story.",
     scene:{ask:"What was inside the silver envelope?",choices:["A note and a café key","A map","A photograph"],answer:"A note and a café key"},
     word:"谢谢",pinyin:"xiè xie",meaning:"thank you",tip:"Drop the first <strong>xiè</strong> clearly and keep the second one light."}]},
  {id:"school",icon:"💼",title:"First Week at Work",description:"Navigate introductions, meetings, deadlines, and workplace conversation.",lessons:[
    {title:"Meet Your Colleague",beats:[
      "On her first morning in Shanghai, Lan meets the colleague who will lead her project.",
      "He stands by the window with a cup of coffee, already waiting for her."],
     mystery:"Introduce a colleague before the team meeting begins.",
     scene:{ask:"Who was waiting for Lan by the window?",choices:["Her new colleague","A delivery person","Her manager’s assistant"],answer:"Her new colleague"},
     word:"同事",pinyin:"tóng shì",meaning:"colleague",tip:"Let <strong>tóng</strong> rise, then drop <strong>shì</strong> firmly."},
    {title:"The Meeting Room",beats:[
      "A calendar notification appears, but the room number is written only in Chinese.",
      "Lan checks the board outside the elevator to find the right floor."],
     mystery:"Name the meeting to confirm the right room.",
     scene:{ask:"What was the problem with the calendar notification?",choices:["The room number was only in Chinese","It was on the wrong day","It had no time"],answer:"The room number was only in Chinese"},
     word:"会议",pinyin:"huì yì",meaning:"meeting",tip:"Both syllables fall. Keep each one clear and decisive."},
    {title:"Tomorrow’s Deadline",beats:[
      "The client moves the presentation forward. Lan checks the new date with her manager.",
      "Her manager replies: ‘No problem. We will meet tomorrow.’"],
     mystery:"Confirm when the presentation is due.",
     scene:{ask:"What did the manager tell Lan?",choices:["They will meet tomorrow","The meeting is cancelled","She should leave early"],answer:"They will meet tomorrow"},
     word:"明天",pinyin:"míng tiān",meaning:"tomorrow",tip:"Let <strong>míng</strong> rise, then keep <strong>tiān</strong> high and level."},
    {title:"A Busy Afternoon",beats:[
      "Messages arrive from three teams at once. Lan explains why she cannot join another call.",
      "‘I’m very busy this afternoon,’ she writes, ‘but I can call you tomorrow.’"],
     mystery:"Describe the afternoon and close the workday.",
     scene:{ask:"Why couldn’t Lan join the call?",choices:["She was very busy","Her phone died","She was travelling"],answer:"She was very busy"},
     word:"很忙",pinyin:"hěn máng",meaning:"very busy",tip:"Let <strong>hěn</strong> dip and <strong>máng</strong> rise."}]},
  {id:"postcards",icon:"🧳",title:"A Weekend in Hangzhou",description:"Handle a hotel, directions, shopping, and changing weather.",lessons:[
    {title:"Hotel Check-in",beats:[
      "After arriving in Hangzhou, Ava checks the address on the booking and approaches reception.",
      "The receptionist smiles and slides a room card across the counter."],
     mystery:"Name the hotel to begin the weekend.",
     scene:{ask:"Where did Ava go after arriving in Hangzhou?",choices:["The hotel reception","The train station","A restaurant"],answer:"The hotel reception"},
     word:"酒店",pinyin:"jiǔ diàn",meaning:"hotel",tip:"Let <strong>jiǔ</strong> dip and rise, then drop <strong>diàn</strong>."},
    {title:"Find the Park",beats:[
      "Bao followed a painted map, but the path split beside a bamboo gate.",
      "A local vendor pointed first left, then right, and laughed."],
     mystery:"Ask where the park is to choose the right path.",
     scene:{ask:"What did the vendor do?",choices:["Pointed in two directions","Sold a map","Asked for directions"],answer:"Pointed in two directions"},
     word:"哪里",pinyin:"nǎ lǐ",meaning:"where",tip:"Both syllables dip; keep the second one gentle in natural speech."},
    {title:"The Red Kite",beats:[
      "At the market, dozens of kites danced overhead. One carried Ava’s next postcard.",
      "The stall owner held up a bright red kite with a note tied to its tail."],
     mystery:"Name its color before it flies away.",
     scene:{ask:"What color was the kite with the note?",choices:["Red","Green","Yellow"],answer:"Red"},
     word:"红色",pinyin:"hóng sè",meaning:"red",tip:"Let <strong>hóng</strong> rise, then drop <strong>sè</strong>."},
    {title:"Rain by the Lake",beats:[
      "Dark clouds gather as Ava reaches West Lake and decides whether to continue walking.",
      "The first drops land on the water, and a nearby shop owner offers her an umbrella."],
     mystery:"Name the weather before choosing the next stop.",
     scene:{ask:"What did the weather do as Ava reached the lake?",choices:["It began to rain","It cleared up","It grew windy"],answer:"It began to rain"},
     word:"下雨",pinyin:"xià yǔ",meaning:"to rain",tip:"Drop <strong>xià</strong>, then let <strong>yǔ</strong> dip and rise."}]},
  {id:"city",icon:"🌆",title:"Shanghai After Hours",description:"Use practical Chinese for transport, reservations, dining, and late work.",lessons:[
    {title:"The Last Train",beats:[
      "Jiayi leaves the office late and checks the fastest route across the city.",
      "The map shows the metro runs for twenty more minutes."],
     mystery:"Find the metro before the final train departs.",
     scene:{ask:"How much longer would the metro run?",choices:["Twenty minutes","One hour","It had already stopped"],answer:"Twenty minutes"},
     word:"地铁",pinyin:"dì tiě",meaning:"metro",tip:"Drop <strong>dì</strong>, then let <strong>tiě</strong> dip and rise."},
    {title:"Dinner Reservation",beats:[
      "A client recommends a small restaurant, but every table appears to be taken.",
      "Jiayi checks her phone: the reservation is under her name at eight."],
     mystery:"Ask about the reservation at the host stand.",
     scene:{ask:"What did Jiayi check on her phone?",choices:["Her reservation","The weather","A train time"],answer:"Her reservation"},
     word:"预订",pinyin:"yù dìng",meaning:"reservation",tip:"Both syllables fall; keep them separate and clear."},
    {title:"The Bill",beats:[
      "After dinner, Jiayi checks the table and signals to the server.",
      "The server nods, prints the bill, and slides it across the table."],
     mystery:"Ask for the bill before the metro closes.",
     scene:{ask:"What did Jiayi ask for before the metro closed?",choices:["The bill","A menu","The dessert list"],answer:"The bill"},
     word:"账单",pinyin:"zhàng dān",meaning:"bill",tip:"Drop <strong>zhàng</strong>, then hold <strong>dān</strong> high and level."},
    {title:"Late at the Office",beats:[
      "A message from the project lead changes the plan for the following morning.",
      "The team decides to stay late and finish the report tonight."],
     mystery:"Explain why the team is still at work.",
     scene:{ask:"Why did the team stay late?",choices:["To finish the report","To wait for a client","To celebrate"],answer:"To finish the report"},
     word:"加班",pinyin:"jiā bān",meaning:"work overtime",tip:"Keep both syllables high and level."}]}
]

const trackGuides={mystery:{name:"Lila",face:"🕵🏻‍♀️",line:"Follow the evidence and unlock the next chapter."},cafe:{name:"Mei",face:"👩🏻‍🍳",line:"Practice language you can use at a café."},school:{name:"Lan",face:"👩🏻‍💼",line:"Build confidence for workplace conversations."},postcards:{name:"Ava",face:"👩🏽",line:"Use practical Chinese throughout the weekend."},city:{name:"Jiayi",face:"👩🏻‍💻",line:"Navigate the city after work."}}

const lessonExamples={"书店":"书店在哪里？","秘密":"这是一个秘密。","镜子":"镜子在房间里。","月亮":"今晚的月亮很亮。","钥匙":"我的钥匙在哪里？","花园":"花园很安静。","你好":"你好，很高兴认识你。","茶":"我要一杯茶。","三个":"我要三个。","谢谢":"谢谢你的帮助。","同事":"她是我的同事。","会议":"会议几点开始？","明天":"我们明天见。","很忙":"我今天很忙。","酒店":"酒店在哪里？","哪里":"洗手间在哪里？","红色":"我喜欢红色。","下雨":"今天下雨。","地铁":"我坐地铁去公司。","预订":"我有预订。","账单":"请给我账单。","加班":"我今天要加班。"}

const sentencePractice=[
  {word:"你好",en:"Hello, nice to meet you.",parts:["你好","很高兴","认识你"],text:"你好，很高兴认识你。"},
  {word:"茶",en:"I would like a cup of tea.",parts:["我","要","一杯","茶"],text:"我要一杯茶。"},
  {word:"谢谢",en:"Thank you for your help.",parts:["谢谢","你的","帮助"],text:"谢谢你的帮助。"},
  {word:"同事",en:"She is my colleague.",parts:["她","是","我的","同事"],text:"她是我的同事。"},
  {word:"会议",en:"What time does the meeting start?",parts:["会议","几点","开始"],text:"会议几点开始？"},
  {word:"明天",en:"See you tomorrow.",parts:["我们","明天","见"],text:"我们明天见。"},
  {word:"酒店",en:"Where is the hotel?",parts:["酒店","在","哪里"],text:"酒店在哪里？"},
  {word:"地铁",en:"I take the metro to the office.",parts:["我","坐","地铁","去","公司"],text:"我坐地铁去公司。"},
  {word:"预订",en:"I have a reservation.",parts:["我","有","预订"],text:"我有预订。"},
  {word:"账单",en:"Please give me the bill.",parts:["请","给我","账单"],text:"请给我账单。"},
  {word:"加班",en:"I need to work overtime today.",parts:["我","今天","要","加班"],text:"我今天要加班。"}
]
