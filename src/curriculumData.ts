import { 
  MessageSquare, 
  Target, 
  Zap, 
  ShieldAlert, 
  Heart, 
  Users, 
  Compass, 
  BarChart3,
  AlertCircle,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export type SlideType = 'intro' | 'reflection' | 'content' | 'stepper' | 'simulator' | 'branching' | 'summary' | 'mechanism';

export interface Choice {
  text: string;
  feedback: string;
  trustChange: number;
  skillUsed?: string;
  nextNodeId: string;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  expression: 'neutral' | 'angry' | 'sad' | 'happy';
  choices: Choice[];
}

export interface Slide {
  id: string;
  part: number;
  title: string;
  type: SlideType;
  content?: any;
}

export const curriculumData: Slide[] = [
  // 第一部分：開場與自我反思
  {
    id: 'p1-1',
    part: 1,
    title: '課程開場',
    type: 'intro',
    content: {
      subtitle: '激勵改變，與抗拒共舞',
      description: '動機式晤談課程（Motivational Interviewing, MI）',
      instructor: '林彥宇 督導',
      organization: '苗栗縣身心障礙者服務中心(第一區)',
      date: '114.6.27'
    }
  },
  {
    id: 'p1-2',
    part: 1,
    title: '認識大家、認識自己',
    type: 'mechanism',
    content: {
      mechanismId: 'page-distance-evaluation',
      title: '認識大家、認識自己',
      question1: '妳覺得你離理想中的助人者，還差幾分？(一到十分，分數越高越遠)',
      question2: '你是怎麼走上助人者這條路的？你理想中的助人者是何種樣貌？如果有變得更接近理想的方法，你願意嘗試嗎？'
    }
  },
  {
    id: 'p1-summary',
    part: 1,
    title: '第一部分總結',
    type: 'summary',
    content: {
      points: [
        '動機式晤談 (MI) 是一種協作的對話方式',
        '助人者的距離會影響案主的改變動機',
        '同理心是建立合作關係的基石'
      ],
      conclusion: '準備好進入 MI 的核心世界了嗎？'
    }
  },

  // 第二部分：動機式晤談 (MI) 基礎
  {
    id: 'p2-1',
    part: 2,
    title: '什麼是動機式晤談 (MI)',
    type: 'content',
    content: {
      items: [
        {
          title: '起源與發展',
          desc: '創始人：Miller & Rollnick\n年代：1980年代\n最初應用：成癮領域\n現況：廣泛應用於各領域'
        },
        {
          title: '核心理念',
          desc: '→ 由內而外的改變\n→ 尊重個案自主性\n→ 協作而非對抗\n→ 探索內在矛盾'
        },
        {
          title: '應用範圍',
          desc: '協助酒癮與藥癮者改變行為\n體重控制與身材管理\n慢性疾病控制\n焦慮、憂鬱治療前導'
        }
      ],
      paragraphs: [
        '適合「知道要改變卻無法行動」或「抗拒改變」的人群'
      ]
    }
  },
  {
    id: 'p2-2',
    part: 2,
    title: 'MI 的應用範疇與特殊個案',
    type: 'content',
    content: {
      items: [
        {
          title: '非自願個案',
          desc: '特點與挑戰：\n• 被迫接受服務\n• 缺乏改變動機\n• 可能有敵意'
        },
        {
          title: '抗拒個案',
          desc: '抗拒本質：\n• 對改變的自然反應\n• 非個人特質\n• 保護機制'
        },
        {
          title: '消極個案',
          desc: '特徵：\n• 缺乏動力\n• 被動參與\n• 低自我效能'
        }
      ],
      paragraphs: [
        '關鍵原則：MI 不是說服技巧，而是協助個案探索自身改變動機的方法'
      ]
    }
  },
  {
    id: 'p2-3',
    part: 2,
    title: '動機式晤談的助人歷程',
    type: 'stepper',
    content: {
      items: [
        { title: '融入', desc: '工作重點：建立互相信任和尊重的工作關係。與個案合作一起討論個案關心的議題。\n運用策略：寒暄問暖、好的開場說明、以個案為中心的傾聽、避免掉入對話陷阱。' },
        { title: '聚焦', desc: '工作重點：與個案合作一起找出會談方向。\n運用策略：以個案為中心設定會談議題、運用量尺問句開啟更深入的會談、評估個案改變的動機。' },
        { title: '誘發', desc: '工作重點：幫助個案化解矛盾、增加「改變的對話」的比例與強度、尋找進入「發展計畫」階段的好時機。\n運用策略：鬆動抗拒處理矛盾、運用誘發「改變的對話」的技術、辨識個案準備改變的徵兆。' },
        { title: '發展計畫', desc: '工作重點：幫助個案發展出改變行動方案、協助個案產生改變。\n運用策略：設定目標、協助選取目標、擬定改變行動方案、協助個案修改及執行改變行動方案、再次確認承諾。' }
      ]
    }
  },
  {
    id: 'p2-summary',
    part: 2,
    title: '第二部分總結',
    type: 'summary',
    content: {
      points: [
        'MI 適用於知道要改變卻無法行動的人群',
        '非自願個案需要更多的尊重與同理',
        'MI 的精神在於合作、激發、同理與尊重自主'
      ],
      conclusion: 'MI 不只是一種技巧，更是一種助人的態度。'
    }
  },

  // 第三部分：核心精神與陷阱
  {
    id: 'p3-1',
    part: 3,
    title: '動機式晤談學習路徑',
    type: 'stepper',
    content: {
      items: [
        { title: '理解', desc: '理解MI的核心理念。深入掌握動機式晤談的四大精神、五大原則與四階段流程，建立正確的理論基礎。' },
        { title: '技巧', desc: '掌握OARS技巧。' },
        { title: '辨識', desc: '辨識改變對話與維持對話。' },
        { title: '評估', desc: '運用量尺問句。' },
        { title: '特殊應用', desc: '處理抗拒與非自願個案。' },
        { title: '整合', desc: '實務案例演練。' }
      ]
    }
  },
  {
    id: 'p3-2',
    part: 3,
    title: '六種對話陷阱',
    type: 'mechanism',
    content: {
      mechanismId: 'comp-flip-cards',
      title: '常見的六種對話陷阱',
      description: '點擊卡片，了解在助人過程中我們常不自覺掉入的陷阱。',
      cards: [
        { id: 'trap-1', frontTitle: '一問一答', backTitle: 'Assessment Trap', backContent: '助人者問了太多問題，讓案主覺得自己像在被審問，處於被動狀態。', color: '#F27D26' },
        { id: 'trap-2', frontTitle: '專家', backTitle: 'Expert Trap', backContent: '助人者給出所有答案，案主只需被動接受，失去了自我探索的機會。', color: '#5A5A40' },
        { id: 'trap-3', frontTitle: '過早聚焦', backTitle: 'Premature Focus Trap', backContent: '助人者太快把焦點放在自己認為重要的問題上，忽略了案主真正的困擾。', color: '#141414' },
        { id: 'trap-4', frontTitle: '標籤', backTitle: 'Labeling Trap', backContent: '給案主貼上特定標籤，引發案主的抗拒與防衛。', color: '#8E9299' },
        { id: 'trap-5', frontTitle: '責難', backTitle: 'Blaming Trap', backContent: '糾結於「是誰的錯」，讓案主感到被指責，而無法專注於解決問題。', color: '#D9534F' },
        { id: 'trap-6', frontTitle: '閒聊', backTitle: 'Chat Trap', backContent: '過度閒聊，偏離了助人的目標，雖然氣氛輕鬆但無助於改變。', color: '#5BC0DE' }
      ]
    }
  },
  {
    id: 'p3-3',
    part: 3,
    title: 'MI 四大精神',
    type: 'content',
    content: {
      items: [
        { icon: Users, title: '合作 (Partnership)', desc: '平等的夥伴關係，而非上下級的權威關係。\n• 使用「我們」的語言\n• 邀請案主參與決策\n• 承認案主是自己生活的專家\n\n實例應用\n案主表達不滿時，社工說：「聽起來目前的服務方式不太符合你的需要，我們一起想想看有什麼可以調整的地方。」' },
        { icon: Zap, title: '激發 (Evocation)', desc: '引導案主探索自身改變的理由。' },
        { icon: Heart, title: '同理 (Compassion)', desc: '真誠理解案主的處境與感受。' },
        { icon: Compass, title: '尊重自主 (Autonomy)', desc: '承認案主是自己生活的專家。' }
      ]
    }
  },
  {
    id: 'p3-summary',
    part: 3,
    title: '第三部分總結',
    type: 'summary',
    content: {
      points: [
        '避免落入評估、專家、過早聚焦等對話陷阱',
        'OARS 技巧是 MI 的基礎：開放問句、肯定、反映、摘要',
        '透過 OARS 建立信任關係並引導改變'
      ],
      conclusion: '熟練 OARS，讓對話更具影響力。'
    }
  },

  // 第四部分：MI的五大原則 (DEARS)
  {
    id: 'p4-1',
    part: 4,
    title: 'MI的五大原則 (DEARS)',
    type: 'content',
    content: {
      paragraphs: [
        '動機式晤談的五大原則，也稱為DEARS原則 (Early MI Principles)，是MI實務的核心指導方針。這些原則為社工提供了具體的行動指引，幫助他們在會談中有效地運用MI精神。'
      ],
      items: [
        {
          title: '表達同理心 (Express Empathy)',
          desc: 'MI的核心基礎：以無條件接納建立信任\n表達同理心是MI的基礎原則，它要求社工真誠地理解與接納案主的感受與觀點，而非急於糾正。這不只是技巧，更是一種態度——暫時放下自己的價值觀，從案主的角度理解其行為與感受。\n實務上，透過反映式傾聽與非語言關懷，讓案主感受到被理解。例如：「聽起來你對這個決定感到很矛盾。」\n\n【案例】\n案主：「我知道喝酒不好，但是不喝就睡不著。」\n錯誤回應：「你可以試試運動啊。」\n正確回應：「聽起來你壓力很大，喝酒成了你目前唯一能幫助入睡的方法。」'
        }
      ]
    }
  },
  {
    id: 'p4-2',
    part: 4,
    title: 'MI的五大原則 - 避免爭辯',
    type: 'content',
    content: {
      items: [
        {
          title: '避免爭辯 (Avoid Argumentation)',
          desc: '對抗只會激起抗拒，理解才能建立合作\n避免爭辯的原則提醒社工：與案主爭論只會加強其防衛與抗拒，阻礙改變的可能。當社工試圖糾正或強迫說服時，案主往往會堅持自己的立場，以維護自主性。\n更有效的做法是反映案主觀點，理解其立場與感受，並引導對話轉向合作與探索，而非對立與對抗。\n\n【案例】\n案主：「我沒有酒精問題，我只是偶爾喝一點。」\n錯誤回應：「你每天都喝，這就是酒精依賴。」\n正確回應：「你覺得你目前的飲酒習慣是可以接受的，對你來說也許這是紓壓的一種方式。」'
        }
      ]
    }
  },
  {
    id: 'p4-3',
    part: 4,
    title: 'MI的五大原則 - 發展矛盾感',
    type: 'content',
    content: {
      items: [
        {
          title: '發展矛盾感 (Develop Discrepancy)',
          desc: '幫助案主察覺行為與價值觀的落差\n發展矛盾感是指協助案主覺察其目前行為與個人價值觀、目標或期望之間的差距。當人們意識到行為與重要信念不一致時，會產生內在動機去改變。\n矛盾感的發現應由案主自己提出，社工的任務是引導而非指責。可透過提問、反映及價值探索技巧，協助案主看見行為對其未來或人際關係的影響。\n\n【案例】\n社工：「你剛才提到你很愛你的孩子，希望成為他們的好榜樣。同時你也說到，你擔心你的飲酒習慣可能會影響到他們。你怎麼看這兩件事之間的關係？」'
        }
      ]
    }
  },
  {
    id: 'p4-4',
    part: 4,
    title: 'MI的五大原則 - 捲動抗拒',
    type: 'content',
    content: {
      items: [
        {
          title: '捲動抗拒 (Roll with Resistance)',
          desc: '當案主抗拒時，不對抗，而是順勢理解\n捲動抗拒強調：當案主展現抗拒時，社工不應直接對抗，而應順著案主的語意流動，引導出其背後的擔憂與情緒。抗拒不是壞事，而是案主需要被理解與保護的訊號。\n透過反映、提問與承認案主自主權，能將抗拒轉化為探索的契機，也讓對話維持合作而非對立。\n\n抗拒的本質理解：\n• 抗拒是人類的自然反應，特別是當感受到自主權受到威脅時。抗拒本身並非問題，而是一種保護機制。\n• 抗拒往往包含重要的資訊，如案主的擔憂、恐懼或過往的負面經驗。\n• 將抗拒視為合作的機會，而非需要克服的障礙。\n\n捲動抗拒的技巧：\n• 反映抗拒背後的感受和擔憂，如「聽起來你擔心改變會帶來更多的困難。」\n• 探索抗拒的原因，如「什麼讓你覺得這個建議不適合你？」\n• 承認案主的自主權，如「你有權利選擇不改變，這是你的決定。」\n\n【案例】\n案主：「我不需要任何幫助，我可以自己處理。」\n錯誤回應：「但你之前已經試過很多次都沒有成功。」\n正確回應：「你覺得自己有能力處理這些事情，而且過去你也一直靠自己在撐，這對你來說很重要。」'
        }
      ]
    }
  },
  {
    id: 'p4-5',
    part: 4,
    title: 'MI的五大原則 - 支持自我效能',
    type: 'content',
    content: {
      items: [
        {
          title: '支持自我效能 (Support Self-efficacy)',
          desc: '增強案主對改變的信心，是促進行動的關鍵\n支持自我效能是協助案主相信自己有能力做出改變並維持這些改變。即使有動機，若缺乏信心，改變仍難以發生。\n社工可以透過語言肯定、歷程回顧與目標分解等方式，協助案主看見自己的資源與能力，培養對改變的掌控感。\n\n自我效能的重要性：\n• 自我效能是行動的引擎，沒有信心，再好的建議也難以實踐。\n• 自我效能可由過往成功經驗、模仿學習、語言鼓勵與情緒穩定性所強化。\n• 社工的角色是發現與強化案主內在的力量與經驗。\n\n支持自我效能的方法：\n• 肯定案主曾經的努力與改變成果。\n• 協助案主辨識其優勢與資源。\n• 將大目標拆解為可行的小步驟。\n• 給予案主選擇與控制權，培養主動性。\n\n【案例】\n社工：「你提到你曾經成功減重10公斤，雖然後來復胖了，但那段時間你做到了改變生活習慣。你覺得那時候是什麼讓你堅持下去的？」'
        }
      ]
    }
  },
  {
    id: 'p4-summary',
    part: 4,
    title: '第四部分總結',
    type: 'summary',
    content: {
      points: [
        '辨識 DARN CAT：渴望、能力、理由、需要、承諾、行動、嘗試',
        '量尺問句能有效評估重要性與信心',
        '透過量尺問句引發改變對話'
      ],
      conclusion: '聽見改變的聲音，並放大它。'
    }
  },

  // 第五部分：會談技巧與評估
  {
    id: 'p5-1',
    part: 5,
    title: 'OARS 核心技巧',
    type: 'simulator',
    content: {
      type: 'oars',
      items: [
        { id: 'O', title: '開放式提問', desc: '鼓勵案主多說，避免是非題。' },
        { id: 'A', title: '肯定', desc: '辨識案主的優點與努力。' },
        { id: 'R', title: '反映式傾聽', desc: '重述並深化案主的情感意涵。' },
        { id: 'S', title: '摘要', desc: '統整對話內容，確認理解一致。' }
      ]
    }
  },
  {
    id: 'p5-2',
    part: 5,
    title: '量尺式問句的互動運用',
    type: 'content',
    content: {
      paragraphs: [
        '什麼是量尺式問句？',
        '量尺式問句是動機式晤談中，用來探索案主對改變『重要性』、『信心』與『準備度』的技巧，通常使用0-10分量尺，引導案主自我覺察與行動規劃。'
      ],
      items: [
        {
          title: '量尺式問句的基本概念',
          desc: '量尺式問句 (Scaling Questions) 是動機式晤談中一個重要的評估和介入工具，透過數字量尺來評估案主對改變的重要認知、信心程度，以及探索改變的可能性。\n\n量尺式問句的優點：\n具體化抽象概念：將抽象的感受或想法轉化為具體的數字，便於討論和比較。\n促進自我覺察：透過量化評估，案主能夠更清楚地認識自己的狀態和想法。\n追蹤變化：可以在不同時間點使用相同的量尺，追蹤案主的變化。\n引發討論：量尺分數本身不是目的，而是引發深入討論的起點。'
        }
      ]
    }
  },
  {
    id: 'p5-3',
    part: 5,
    title: '量尺問句互動',
    type: 'simulator',
    content: {
      type: 'scaling',
      question: '改變行為對你來說有多重要？',
      minLabel: '不重要',
      maxLabel: '非常重要'
    }
  },
  {
    id: 'p5-summary',
    part: 5,
    title: '第五部分總結',
    type: 'summary',
    content: {
      points: [
        '行為改變階段：懵懂期、沉思期、準備期、行動期、維持期',
        '針對不同階段給予適當的介入策略',
        '實務演練能幫助我們更熟悉 MI 的應用'
      ],
      conclusion: '改變是一個歷程，陪伴案主走過每個階段。'
    }
  },

  // 第六部分：行為改變階段與對話辨識
  {
    id: 'p6-1',
    part: 6,
    title: '行為改變階段模型',
    type: 'content',
    content: {
      paragraphs: [
        '跨理論模式（Transtheoretical Model, TTM）的改變階段理論為動機式晤談提供了重要的理論基礎，幫助我們理解個人改變的過程和規律。這個模式由Prochaska和DiClemente提出，將改變過程分為五個階段。',
        '「改變是一個循環而非線性的過程。」',
        '「復發是正常的，重點在於對復發的學習、調整和再開始。」'
      ],
      items: [
        { title: '懵懂期 (Precontemplation)', desc: '主要任務：提升問題意識\nMI策略：建立關係、探索價值觀\n避免事項：直接挑戰、強迫改變' },
        { title: '沉思期 (Contemplation)', desc: '主要任務：探索矛盾、發展動機\nMI策略：雙面反映、發展矛盾感\n避免事項：急於解決矛盾' },
        { title: '準備期 (Preparation)', desc: '主要任務：協助規劃\nMI策略：支持決定、制定計畫\n避免事項：過度分析' },
        { title: '行動期 (Action)', desc: '主要任務：支持執行\nMI策略：肯定努力、處理挫折\n避免事項：忽視困難' },
        { title: '維持期 (Maintenance)', desc: '主要任務：預防復發\nMI策略：肯定成就、預防復發\n避免事項：過早結束支持' }
      ]
    }
  },
  {
    id: 'p6-2',
    part: 6,
    title: '辨識改變對話 (DARN CAT)',
    type: 'content',
    content: {
      items: [
        { title: 'D 需求對話 (Desire)', desc: '表達想改變的願望\n範例：「我希望...」「我想要...」' },
        { title: 'A 能力對話 (Ability)', desc: '表達有能力改變的信念\n範例：「我可以...」「我有能力...」' },
        { title: 'R 原因對話 (Reasons)', desc: '表達改變的理由\n範例：「如果我改變，我會得到...」「因為...所以我需要改變」' },
        { title: 'N 需要對話 (Need)', desc: '表達改變的必要性\n範例：「我需要...」「我必須...」' },
        { title: 'C 承諾對話 (Commitment)', desc: '表達改變的意圖或承諾\n範例：「我會...」「我打算...」' },
        { title: 'T 行動對話 (Taking Steps)', desc: '描述已採取的具體行動\n範例：「我已經...」「昨天我做了...」' }
      ],
      paragraphs: [
        '助人者需敏銳地辨識並強化個案的改變對話'
      ]
    }
  },
  {
    id: 'p6-3',
    part: 6,
    title: '改變的對話 vs 維持的對話',
    type: 'content',
    content: {
      items: [
        {
          title: '維持的對話',
          desc: '維持現狀的理由：\n- 「我不需要改變」\n- 「現在這樣就很好」\n- 「改變太困難了」\n- 「我沒有時間」\n\n對改變的抗拒：\n- 「我不想...」\n- 「我不能...」\n- 「我不會...」'
        },
        {
          title: '改變的對話',
          desc: '期待對話：關於改變傾向的陳述\n能力對話：關於能力的陳述\n原因/理由對話：關於改變的具體討論\n需要對話：關於不得不做改變的陳述\n承諾對話：關於可能改變的陳述\n採取行動對話：關於採取行動的陳述'
        }
      ]
    }
  },
  {
    id: 'p6-summary',
    part: 6,
    title: '第六部分總結',
    type: 'summary',
    content: {
      points: [
        '抗拒是互動的結果，而非案主的特質',
        '與抗拒共舞：反映、轉移焦點、重新建構',
        '避免與案主爭辯，保持同理與尊重'
      ],
      conclusion: '將抗拒視為改變的契機，而非阻礙。'
    }
  },

  // 第七部分：實務演練與結尾
  {
    id: 'p7-1',
    part: 7,
    title: '情境模擬：小芸媽的呼救',
    type: 'branching',
    content: {
      initialNodeId: 'start',
      nodes: {
        'start': {
          id: 'start',
          speaker: '小芸媽',
          text: '「我真的快撐不下去了，每天都像在打仗，沒人能幫我... 那些喘息服務根本沒用！」',
          expression: 'angry',
          choices: [
            { 
              text: '「那是因為你還沒試過新的申請流程，我教你。」', 
              feedback: '這是「專家陷阱」。在案主情緒激動時直接給建議會激起更大的防衛。',
              trustChange: -1,
              skillUsed: '說理/專家陷阱',
              nextNodeId: 'defensive'
            },
            { 
              text: '「聽起來你感到精疲力竭，覺得自己孤立無援，甚至對現有的資源感到失望。」', 
              feedback: '這是「反映式傾聽」。準確反映案主的情緒能建立信任並降低防衛。',
              trustChange: 1,
              skillUsed: '反映式傾聽 (Reflection)',
              nextNodeId: 'soften'
            }
          ]
        },
        'defensive': {
          id: 'defensive',
          speaker: '小芸媽',
          text: '「流程？你們就是在刁難我！我不需要這套，我只是想找人說說話而已！」',
          expression: 'angry',
          choices: [
            {
              text: '「抱歉，我剛才太急了。我聽得出你現在真的很心煩。」',
              feedback: '及時道歉並轉回同理是挽救對話的關鍵。',
              trustChange: 1,
              skillUsed: '道歉 + 同理',
              nextNodeId: 'soften'
            }
          ]
        },
        'soften': {
          id: 'soften',
          speaker: '小芸媽',
          text: '「（嘆氣）對啊... 我下個月房租都不知道在哪，孩子又一直鬧... 我真的好累。」',
          expression: 'sad',
          choices: [
            {
              text: '「在這麼多壓力下你還能堅持照顧孩子，這份母愛真的很不容易。」',
              feedback: '這是「肯定 (Affirmation)」。強化案主的內在力量能增加改變的信心。',
              trustChange: 1,
              skillUsed: '肯定 (Affirmation)',
              nextNodeId: 'end'
            }
          ]
        },
        'end': {
          id: 'end',
          speaker: '小芸媽',
          text: '「謝謝你願意聽我說這些... 也許我真的該冷靜下來想想下一步。」',
          expression: 'neutral',
          choices: []
        }
      }
    }
  },
  {
    id: 'p7-2',
    part: 7,
    title: '實務案例討論：林媽媽',
    type: 'content',
    content: {
      paragraphs: [
        '案主：林媽媽，72歲，與患有躁鬱症的成年兒子同住，兒子多年前就不穩定、易怒，偶爾攻擊母親。',
        '她經常哭著來電訴苦，描述傷勢、情緒崩潰，但每次社工建議報警、聲請保護令或強制送醫都會被拒絕。',
        '林媽媽表示：「他如果知道我這樣做，他會更瘋」、「我是他唯一的家人」。'
      ],
      items: [
        {
          title: '討論重點',
          desc: '面對這樣處於「維持現狀」與「恐懼改變」的個案，我們該如何運用 MI 技巧來鬆動她的抗拒，並引導她看見改變的可能性？'
        }
      ]
    }
  },
  {
    id: 'p7-3',
    part: 7,
    title: '課程總結',
    type: 'summary',
    content: {
      points: [
        'MI 是一種以人為本的助人方法',
        '透過 OARS 技巧與 MI 精神，引發案主內在動機',
        '與抗拒共舞，陪伴案主走向改變'
      ],
      conclusion: '激勵改變，與抗拒共舞，成為更好的助人者。'
    }
  }
];
