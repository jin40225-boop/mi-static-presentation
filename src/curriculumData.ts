import {
  BookOpen,
  CheckCircle2,
  Compass,
  Heart,
  MessageSquare,
  Target,
  Users,
  Zap,
} from 'lucide-react';

export type SlideType =
  | 'intro'
  | 'reflection'
  | 'content'
  | 'stepper'
  | 'simulator'
  | 'branching'
  | 'summary'
  | 'mechanism';

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
  {
    id: 'intro',
    part: 1,
    title: '開場',
    type: 'intro',
    content: {
      subtitle: '激勵改變，與抗拒共舞',
      description: '用 Motivational Interviewing 的視角，看見抗拒背後其實藏著保護、猶豫與尚未被說出的理由。',
      instructor: 'Jin',
      organization: '互動式教學簡報 Demo',
    },
  },
  {
    id: 'reflection-checkin',
    part: 1,
    title: '暖身反思',
    type: 'mechanism',
    content: {
      mechanismId: 'page-distance-evaluation',
      title: '你現在和「改變」的距離有多近？',
      question1: '如果 1 分代表完全沒準備，10 分代表已經很想開始，你現在會給自己幾分？',
      question2: '是什麼讓你沒有更低？你身上已經有哪些資源、能力或支持？',
    },
  },
  {
    id: 'part1-summary',
    part: 1,
    title: '為什麼先談改變',
    type: 'summary',
    content: {
      points: [
        '改變不是單靠說服就會發生，很多時候更需要被理解與被整理。',
        '抗拒不一定是對立，可能只是還沒準備好、還沒被說清楚。',
        'MI 的核心不是替對方做決定，而是協助他說出自己的理由。',
      ],
      conclusion: '先接住當下的位置，改變才有可能開始移動。',
    },
  },
  {
    id: 'what-is-mi',
    part: 2,
    title: '什麼是 MI',
    type: 'content',
    content: {
      paragraphs: [
        'Motivational Interviewing 是一種以合作為基礎、用來促進改變動機的對話方法。',
        '它不以說服、糾正、辯論為主，而是透過提問、反映與整理，幫助對方說出自己的改變理由。',
      ],
      items: [
        {
          title: '合作而非對抗',
          desc: '講者不是站在對面拉扯，而是站在旁邊一起看清楚現況與選擇。',
        },
        {
          title: '喚起而非灌輸',
          desc: '與其給答案，不如協助對方說出他本來就有的動機、價值與盼望。',
        },
        {
          title: '尊重自主',
          desc: '改變的主角永遠是當事人，MI 的工作是協助他更清楚自己要往哪裡走。',
        },
      ],
    },
  },
  {
    id: 'mi-flow',
    part: 2,
    title: 'MI 對話流程',
    type: 'stepper',
    content: {
      items: [
        {
          title: '接觸',
          desc: '先建立安全、可說話的關係感，讓對方知道自己不是來被糾正或被評分。',
        },
        {
          title: '聚焦',
          desc: '一起確認這次談話最重要的是什麼，避免對話一直散掉或太快跳到解法。',
        },
        {
          title: '喚起',
          desc: '透過提問與反映，引出對方自己的理由、信心、需求與期待。',
        },
        {
          title: '規劃',
          desc: '當動機比較明確時，再一起把想法整理成下一步可行的小行動。',
        },
      ],
    },
  },
  {
    id: 'part2-summary',
    part: 2,
    title: 'MI 的定位',
    type: 'summary',
    content: {
      points: [
        'MI 是一種促進改變的對話方式，不只是問問題的技巧。',
        '它的力量來自合作、聚焦、喚起與規劃的節奏。',
        '真正重要的不是你說得多有道理，而是對方是否更能聽見自己。',
      ],
      conclusion: '先建立對話品質，技巧才會真正發揮作用。',
    },
  },
  {
    id: 'spirit-of-mi',
    part: 3,
    title: 'MI 的精神',
    type: 'content',
    content: {
      items: [
        {
          icon: Users,
          title: 'Partnership 夥伴關係',
          desc: '我們不是替對方做決定，而是與對方一起理解處境、整理方向。',
        },
        {
          icon: Zap,
          title: 'Evocation 喚起',
          desc: '重點不是輸入新觀念，而是引出對方原本就有但尚未成形的想法。',
        },
        {
          icon: Heart,
          title: 'Compassion 關懷',
          desc: '把對方的福祉放在中心，而不是急著證明自己是對的。',
        },
        {
          icon: Compass,
          title: 'Autonomy 自主',
          desc: '尊重對方有權利決定是否改變、何時改變、如何改變。',
        },
      ],
    },
  },
  {
    id: 'oars',
    part: 3,
    title: 'OARS 四個核心技巧',
    type: 'simulator',
    content: {
      type: 'oars',
      items: [
        { id: 'O', title: 'Open Questions 開放式問句', desc: '讓對方展開敘說，而不是只回答「是」或「不是」。' },
        { id: 'A', title: 'Affirmation 肯定', desc: '指出對方已經做對的部分、已經擁有的能力與價值。' },
        { id: 'R', title: 'Reflective Listening 反映', desc: '把對方說的內容、情緒與意義整理後還給他。' },
        { id: 'S', title: 'Summary 摘要', desc: '把散落的訊息收束起來，幫助對方看見目前的位置。' },
      ],
    },
  },
  {
    id: 'traps',
    part: 3,
    title: '常見對話陷阱',
    type: 'mechanism',
    content: {
      mechanismId: 'comp-flip-cards',
      title: '這些反應很常見，也很容易讓對話卡住',
      description: '點開卡片，看見在助人或教學現場中最容易不小心踩到的幾種陷阱。',
      cards: [
        {
          id: 'trap-1',
          frontTitle: '急著診斷',
          backTitle: 'Assessment Trap',
          backContent: '太快下結論、貼標籤，會讓對方感覺自己被定義，而不是被理解。',
          color: '#F27D26',
        },
        {
          id: 'trap-2',
          frontTitle: '急著給建議',
          backTitle: 'Expert Trap',
          backContent: '當我們太快提供答案，對方往往還來不及說出自己的想法與準備程度。',
          color: '#5A5A40',
        },
        {
          id: 'trap-3',
          frontTitle: '急著聚焦',
          backTitle: 'Premature Focus Trap',
          backContent: '我們認為重要的議題，不一定是對方此刻最能碰觸的議題。',
          color: '#141414',
        },
        {
          id: 'trap-4',
          frontTitle: '急著貼標籤',
          backTitle: 'Labeling Trap',
          backContent: '一旦被貼上標籤，對話容易轉向防衛，而不是探索。',
          color: '#8E9299',
        },
        {
          id: 'trap-5',
          frontTitle: '急著責備',
          backTitle: 'Blaming Trap',
          backContent: '責怪常常會放大羞愧與對立，卻未必能增加改變意願。',
          color: '#D9534F',
        },
        {
          id: 'trap-6',
          frontTitle: '只剩閒聊',
          backTitle: 'Chat Trap',
          backContent: '如果只有陪伴而沒有聚焦，對話可能舒服卻無法真正前進。',
          color: '#5BC0DE',
        },
      ],
    },
  },
  {
    id: 'part3-summary',
    part: 3,
    title: '技巧背後的姿態',
    type: 'summary',
    content: {
      points: [
        'OARS 不是話術，而是把 MI 精神落到對話中的方法。',
        '真正有效的反映與提問，建立在夥伴關係與尊重自主之上。',
        '當我們少一點糾正衝動，對方才更可能說出自己的改變語句。',
      ],
      conclusion: '姿態先對了，技巧才不會變成壓力。',
    },
  },
  {
    id: 'change-talk',
    part: 4,
    title: '什麼是改變語句',
    type: 'content',
    content: {
      paragraphs: [
        '改變語句是對方自己說出來、朝向改變的語言線索。',
        '當一個人開始說出想要、能夠、理由、需要、承諾與行動時，改變就開始有了方向。',
      ],
      items: [
        {
          icon: MessageSquare,
          title: 'DARN',
          desc: 'Desire、Ability、Reasons、Need：反映對方對改變的意願與理由。',
        },
        {
          icon: Target,
          title: 'CAT',
          desc: 'Commitment、Activation、Taking steps：從想法往實際行動移動的語言。',
        },
      ],
    },
  },
  {
    id: 'scaling',
    part: 4,
    title: '量尺問句',
    type: 'simulator',
    content: {
      type: 'scaling',
      question: '如果 0 分代表完全不想改變，10 分代表現在就準備開始，你會把自己放在哪裡？',
      minLabel: '尚未準備',
      maxLabel: '準備開始',
    },
  },
  {
    id: 'poll-demo',
    part: 4,
    title: '現場投票示意',
    type: 'mechanism',
    content: {
      mechanismId: 'page-live-dashboard-radio',
      title: '你在帶領改變時，最常遇到哪一種阻力？',
      options: [
        { label: '對方沉默不說', value: 'silent', color: '#DB7A4E' },
        { label: '對方一直辯解', value: 'defend', color: '#6B705C' },
        { label: '對方說知道但做不到', value: 'stuck', color: '#A98467' },
        { label: '對方答應卻沒有行動', value: 'delay', color: '#84A59D' },
      ],
    },
  },
  {
    id: 'part4-summary',
    part: 4,
    title: '改變語句的重點',
    type: 'summary',
    content: {
      points: [
        '比起一直回應抗拒，更有效的是捕捉並放大改變語句。',
        '量尺問句的價值，不在分數本身，而在分數背後的理由。',
        '當對方說出自己的理由，改變就不再只是外在要求。',
      ],
      conclusion: '我們不是替對方製造動機，而是協助他聽見自己已有的動機。',
    },
  },
  {
    id: 'branching',
    part: 5,
    title: '與抗拒共舞',
    type: 'branching',
    content: {
      initialNodeId: 'start',
      nodes: {
        start: {
          id: 'start',
          speaker: '個案',
          text: '你們都只會叫我改，可是根本沒有人懂我現在有多累。',
          expression: 'angry',
          choices: [
            {
              text: '你如果再不改，後果真的會更嚴重。',
              feedback: '這句話雖然出於擔心，但容易把對話推向對立，對方更可能防衛。',
              trustChange: -1,
              skillUsed: '說服',
              nextNodeId: 'defensive',
            },
            {
              text: '你覺得大家都在催你，卻沒有人真正理解你現在的壓力。',
              feedback: '這是一個反映句，先接住感受與處境，能讓對方比較願意繼續說。',
              trustChange: 1,
              skillUsed: 'Reflection',
              nextNodeId: 'soften',
            },
          ],
        },
        defensive: {
          id: 'defensive',
          speaker: '個案',
          text: '對啊，你看，你也只是在講大道理而已。我早就知道那些了。',
          expression: 'angry',
          choices: [
            {
              text: '你不是不知道，而是現在真的被很多壓力卡住了。',
              feedback: '這句話把焦點從責備轉回經驗本身，能稍微降低對方的防衛。',
              trustChange: 1,
              skillUsed: 'Reflection',
              nextNodeId: 'soften',
            },
          ],
        },
        soften: {
          id: 'soften',
          speaker: '個案',
          text: '我也不是不想改，只是每次想開始，就覺得自己一定又會失敗。',
          expression: 'sad',
          choices: [
            {
              text: '你其實很在乎這件事，而且還是一直在想辦法，只是怕再次失望。',
              feedback: '這同時包含肯定與反映，幫助對方看見自己仍有在乎與努力。',
              trustChange: 1,
              skillUsed: 'Affirmation + Reflection',
              nextNodeId: 'end',
            },
          ],
        },
        end: {
          id: 'end',
          speaker: '個案',
          text: '嗯……如果不是一下子要做到很多，也許我可以先從一件小事開始。',
          expression: 'happy',
          choices: [],
        },
      },
    },
  },
  {
    id: 'close',
    part: 5,
    title: '結語',
    type: 'content',
    content: {
      paragraphs: [
        'MI 不是讓人立刻改變的魔法，而是一種讓改變更有機會發生的對話空間。',
        '當我們少一點對抗、多一點整理；少一點急著推、多一點陪對方看清楚，改變就可能從抗拒裡長出來。',
      ],
      items: [
        {
          icon: BookOpen,
          title: '今天帶走一句話',
          desc: '與其問「你為什麼不改？」，不如問「什麼對你來說是重要的？」',
        },
        {
          icon: CheckCircle2,
          title: '今天帶走一個做法',
          desc: '先反映，再提問；先建立關係，再談改變。',
        },
      ],
    },
  },
  {
    id: 'final-summary',
    part: 5,
    title: '謝謝聆聽',
    type: 'summary',
    content: {
      points: [
        '改變通常不是被推動出來，而是在安全的對話中被喚起。',
        '抗拒不是終點，而是理解對方位置的重要入口。',
        'MI 幫助我們把「想說服」轉成「想理解」，把「催促改變」轉成「陪伴形成改變」。',
      ],
      conclusion: '願我們都能在對話裡，陪人走到更靠近改變的位置。',
    },
  },
];
