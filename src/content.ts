/**
 * BRIEFING DE FOTOGRAFIA PARA O CLIENTE
 * 
 * VAGA 01 — HERO PRINCIPAL (DESKTOP)
 * - Proporção: 16:9 ou 3:2 horizontal (mínimo 2400 × 1350 px).
 * - Assunto: Detalhe tátil de aproximação (macro) da matéria-prima ou peça artesanal em repouso.
 * - Luz: Luz natural difusa lateral de baixa intensidade (estilo janela ao fim de tarde), gerando relevo palpável e sombras suaves sem reflexos estourados.
 * - Enquadramento: Peça ligeiramente à direita do terço médio. O terço esquerdo deve conter respiro visual escuro para acomodar o título.
 * 
 * VAGA 02 — HERO SECUNDÁRIO (MOBILE)
 * - Proporção: 9:16 vertical (mínimo 1080 × 1920 px).
 * - Assunto: Mesmo universo material, com enquadramento vertical focado na silhueta e na textura mineral.
 * - Luz: Luz suave de topo/lateral, gerando contraste sereno e acabamento orgânico.
 * - Enquadramento: Ponto focal no quadrante superior, permitindo que a metade inferior se funda suavemente ao fundo da página.
 * 
 * VAGA 03 — CAPÍTULO 01 (A MATÉRIA BRUTA)
 * - Proporção: 4:3 horizontal ou 1:1.
 * - Assunto: Matéria em estado puro antes do trabalho (nuggets de metal nobre, pedras brutas ou minerais sobre bancada de atelier).
 * - Luz: Luz pontual e intimista.
 * - Enquadramento: Plano detalhe com foco seletivo e profundidade de campo curta.
 * 
 * VAGA 04 — CAPÍTULO 02 (O GESTO E AS FERRAMENTAS)
 * - Proporção: 4:3 horizontal ou 1:1.
 * - Assunto: As mãos do artífice em ação com ferramenta tradicional (martelo, lima, cinzel ou fogo controlado).
 * - Luz: Luz dramática e quente, capturando a poeira e o calor do ofício.
 * - Enquadramento: Plano fechado nas mãos e no ponto de contato com a matéria.
 * 
 * VAGA 05 — CAPÍTULO 03 (A FORMA PERMANENTE)
 * - Proporção: 4:3 horizontal ou 1:1.
 * - Assunto: O objeto concluído em ângulo arquitetônico sobre superfície de pedra ou linho escuro.
 * - Luz: Luz zenital suave com reflexo discreto de contorno.
 * - Enquadramento: Centro geométrico equilibrado.
 * 
 * VAGA 06 — GALERIA 01 (PEÇA ESCULTURAL VERTICAL)
 * - Proporção: 3:4 vertical.
 * - Assunto: Peça de destaque montada sobre pedestal ou base mineral monolítica.
 * - Luz: Luz de galeria, fundo limpo de estúdio com sombras arquitetônicas.
 * - Enquadramento: Vertical imponente de corpo inteiro da peça.
 * 
 * VAGA 07 — GALERIA 02 (ATMOSFERA DO ESPAÇO)
 * - Proporção: 16:9 horizontal.
 * - Assunto: O ambiente de trabalho silencioso, bancadas de madeira maciça, ferramentas organizadas e feixe de luz natural.
 * - Luz: Luz natural da manhã cortando a atmosfera calma.
 * - Enquadramento: Plano aberto com perspectiva arquitetônica serena.
 */

export interface ImageSlot {
  src: string;
  alt: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ChapterItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  image: ImageSlot;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  timeframe: string;
  image: ImageSlot;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  aspect: 'vertical' | 'horizontal' | 'square';
  image: ImageSlot;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  author: string;
  role: string;
  quote: string;
}

export interface SiteContent {
  brand: {
    name: string;
    kicker: string;
    tagline: string;
  };

  header: {
    enabled: boolean;
    nav: NavLink[];
    primaryAction: {
      label: string;
      href: string;
    };
    sound: {
      labelOn: string;
      labelOff: string;
      audioSrc?: string;
    };
  };

  intro: {
    enabled: boolean;
    statement: string;
  };

  hero: {
    enabled: boolean;
    kicker: string;
    title: {
      leadingText: string;
      highlightedWord: string;
      trailingText: string;
    };
    description: string;
    primaryAction: {
      label: string;
      href: string;
    };
    secondaryAction: {
      label: string;
      href: string;
    };
    metadataNote: {
      label: string;
      value: string;
    };
    image: ImageSlot;
    mobileImage: ImageSlot;
  };

  capitulos: {
    enabled: boolean;
    sectionNumber?: string;
    kicker: string;
    title: string;
    items: ChapterItem[];
  };

  servicos: {
    enabled: boolean;
    sectionNumber?: string;
    kicker: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };

  galeria: {
    enabled: boolean;
    sectionNumber?: string;
    kicker: string;
    title: string;
    description: string;
    items: GalleryItem[];
    closeLabel: string;
  };

  visite: {
    enabled: boolean;
    sectionNumber?: string;
    kicker: string;
    title: string;
    description: string;
    schedule: {
      label: string;
      value: string;
      note: string;
    };
    location: {
      label: string;
      value: string;
      note: string;
    };
    whatsappAction: {
      label: string;
      href: string;
      note: string;
    };
  };

  depoimentos: {
    enabled: boolean;
    kicker: string;
    title: string;
    items: TestimonialItem[];
  };

  faq: {
    enabled: boolean;
    sectionNumber?: string;
    kicker: string;
    title: string;
    description: string;
    items: FaqItem[];
  };

  ctaFinal: {
    enabled: boolean;
    statement: {
      leading: string;
      highlight: string;
      trailing: string;
    };
    description: string;
    primaryAction: {
      label: string;
      href: string;
    };
    secondaryNote: string;
  };

  rodape: {
    enabled: boolean;
    brandSummary: string;
    colophonLeft: string;
    colophonRight: string;
    links: NavLink[];
  };
}

export const siteContent: SiteContent = {
  brand: {
    name: 'Nome da Marca',
    kicker: 'Oficina Autoral',
    tagline: 'Objetos duradouros concebidos através do tempo e da matéria.',
  },

  header: {
    enabled: true,
    nav: [
      { label: 'Capítulos', href: '#capitulos' },
      { label: 'Criações', href: '#servicos' },
      { label: 'Acervo', href: '#galeria' },
      { label: 'Visita', href: '#visite' },
      { label: 'Dúvidas', href: '#duvidas' },
    ],
    primaryAction: {
      label: 'Agendar Visita',
      href: '#visite',
    },
    sound: {
      labelOn: 'Som ativado',
      labelOff: 'Ativar som',
    },
  },

  intro: {
    enabled: true,
    statement: 'A matéria moldada pelo silêncio.',
  },

  hero: {
    enabled: true,
    kicker: 'Ensaio Autoral · Série I',
    title: {
      leadingText: 'A matéria moldada pelo',
      highlightedWord: 'tempo',
      trailingText: 'e pelo silêncio',
    },
    description: 'Investigação tátil sobre proporções serenas, processos manuais e a permanência das formas através das estações.',
    primaryAction: {
      label: 'Conhecer a Coleção',
      href: '#capitulos',
    },
    secondaryAction: {
      label: 'Ver Especificações',
      href: '#servicos',
    },
    metadataNote: {
      label: 'Disponibilidade',
      value: 'Série numerada sob encomenda',
    },
    image: {
      src: '/src/assets/images/artisan_gold_macro_1791154614162.jpg',
      alt: 'Fotografia editorial em detalhe aproximado de textura mineral e metal nobre com iluminação rasante',
    },
    mobileImage: {
      src: '/src/assets/images/artisan_gold_vertical_1791154625280.jpg',
      alt: 'Fotografia editorial vertical com luz suave modelando a forma da peça',
    },
  },

  capitulos: {
    enabled: true,
    sectionNumber: '01',
    kicker: 'Caderno de Processo',
    title: 'Três momentos da criação',
    items: [
      {
        id: 'cap-01',
        index: '01 / 03',
        title: 'A Matéria Mineral',
        subtitle: 'Origem e Seleção',
        description: 'Metais nobres e minerais brutos selecionados por sua densidade e textura tátil antes de qualquer intervenção mecânica.',
        image: {
          src: '/src/assets/images/craft_raw_matter_1791155656830.jpg',
          alt: 'Nugget de metal nobre e pedras minerais escuras sobre bancada de madeira',
        },
      },
      {
        id: 'cap-02',
        index: '02 / 03',
        title: 'O Gesto Humano',
        subtitle: 'Fogo e Martelo',
        description: 'Forjamento manual em baixa rotação onde cada golpe imprime variações únicas impossíveis de replicar industrialmente.',
        image: {
          src: '/src/assets/images/craft_hand_tool_1791155666994.jpg',
          alt: 'Mãos do artesão empunhando ferramenta tradicional de forja com iluminação pontual',
        },
      },
      {
        id: 'cap-03',
        index: '03 / 03',
        title: 'A Forma Concluída',
        subtitle: 'Repouso e Permanência',
        description: 'O acabamento fosco e escovado que ganha profundidade com o uso cotidiano e a passagem dos anos.',
        image: {
          src: '/src/assets/images/craft_finished_form_1791155675407.jpg',
          alt: 'Peça concluída com acabamento escovado repousando sobre laje de ardósia escura',
        },
      },
    ],
  },

  servicos: {
    enabled: true,
    sectionNumber: '02',
    kicker: 'Linhas de Trabalho',
    title: 'Criações sob encomenda',
    description: 'Cada encomenda é acompanhada desde a prova volumétrica até a entrega da peça final.',
    items: [
      {
        id: 'serv-01',
        index: '01',
        title: 'Anéis Esculturais',
        category: 'Metais Nobres',
        description: 'Volumes assimétricos com acabamento fosco e texturas orgânicas moldadas à mão.',
        timeframe: 'Tempo de feitura: Informação do cliente',
        image: {
          src: '/src/assets/images/craft_finished_form_1791155675407.jpg',
          alt: 'Anel com volume escultural e relevo sutil',
        },
      },
      {
        id: 'serv-02',
        index: '02',
        title: 'Objetos de Mesa e Rito',
        category: 'Bronze e Ouro',
        description: 'Pequenos recipientes, marcadores e pesos de papel com peso equilibrado e corte preciso.',
        timeframe: 'Tempo de feitura: Informação do cliente',
        image: {
          src: '/src/assets/images/gallery_sculptural_piece_1791155685555.jpg',
          alt: 'Objeto de apoio com formato monolítico e acabamento escovado',
        },
      },
      {
        id: 'serv-03',
        index: '03',
        title: 'Desenhos sob Medida',
        category: 'Projetos Exclusivos',
        description: 'Desenvolvimento conjunto a partir de pedras de família ou desenhos comemorativos singulares.',
        timeframe: 'Tempo de feitura: Informação do cliente',
        image: {
          src: '/src/assets/images/gallery_atelier_atmosphere_1791155697674.jpg',
          alt: 'Caderno de esboços e instrumentos de medição na bancada de trabalho',
        },
      },
    ],
  },

  galeria: {
    enabled: true,
    sectionNumber: '03',
    kicker: 'Registro Visual',
    title: 'Estudos de luz e proporção',
    description: 'Fragmentos do ateliê e estudos volumétricos capturados sob iluminação natural.',
    closeLabel: 'Fechar visualizador',
    items: [
      {
        id: 'gal-01',
        title: 'Estudo Volumétrico I',
        caption: 'Ensaio fotográfico sobre coluna mineral escura com luz rasante.',
        aspect: 'vertical',
        image: {
          src: '/src/assets/images/gallery_sculptural_piece_1791155685555.jpg',
          alt: 'Peça de desenho vertical sobre pedestal de pedra mineral',
        },
      },
      {
        id: 'gal-02',
        title: 'A Atmosfera do Ateliê',
        caption: 'Bancada de carvalho maciço e instrumentos de forja sob a luz da manhã.',
        aspect: 'horizontal',
        image: {
          src: '/src/assets/images/gallery_atelier_atmosphere_1791155697674.jpg',
          alt: 'Visão panorâmica da bancada do ateliê banhada por luz de janela',
        },
      },
      {
        id: 'gal-03',
        title: 'A Textura Forjada',
        caption: 'Macro fotografia dos sulcos gerados pelo martelo de ponta redonda.',
        aspect: 'square',
        image: {
          src: '/src/assets/images/artisan_gold_macro_1791154614162.jpg',
          alt: 'Superfície de ouro com marcas orgânicas de forja manual',
        },
      },
    ],
  },

  visite: {
    enabled: true,
    sectionNumber: '04',
    kicker: 'Atendimento e Encontros',
    title: 'Visite o ateliê',
    description: 'Atendimentos presenciais ocorrem com hora reservada para que possamos dedicar tempo exclusivo a cada conversa.',
    schedule: {
      label: 'Horário de Atendimento',
      value: 'Informação do cliente (ex.: Terça a Sábado, mediante reserva)',
      note: 'Sessões individuais de 60 minutos para desenho e prova.',
    },
    location: {
      label: 'Endereço e Bairro',
      value: 'Informação do cliente (ex.: Bairro e Cidade)',
      note: 'Instalações com acesso reservado e estacionamento próximo.',
    },
    whatsappAction: {
      label: 'Conversar via WhatsApp',
      href: 'https://wa.me/5500000000000?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20pe%C3%A7as%20e%20visitas.',
      note: 'Resposta habitual em até um dia útil.',
    },
  },

  // Regra Técnica 4: Sem inventar depoimentos. A seção só renderiza se houver itens reais.
  depoimentos: {
    enabled: false,
    kicker: 'Testemunhos',
    title: 'O que dizem sobre o trabalho',
    items: [],
  },

  faq: {
    enabled: true,
    sectionNumber: '05',
    kicker: 'Esclarecimentos',
    title: 'Perguntas frequentes',
    description: 'Respostas para as dúvidas mais comuns sobre o processo de encomenda e entrega.',
    items: [
      {
        id: 'faq-01',
        question: 'Como funciona o processo de criação sob encomenda?',
        answer: 'Iniciamos com uma conversa sobre referências, proporções e o uso desejado. Desenvolvemos estudos em cera ou maquete antes da fundição definitiva no metal escolhido.',
      },
      {
        id: 'faq-02',
        question: 'Posso utilizar metais ou pedras de peças antigas de família?',
        answer: 'Sim. Realizamos uma avaliação prévia da pureza do metal e do estado das gemas para verificar a viabilidade técnica de refinamento e reaproveitamento integral.',
      },
      {
        id: 'faq-03',
        question: 'Qual é o prazo médio de produção de uma peça?',
        answer: 'Informação do cliente (ex.: normalmente entre quatro a oito semanas, a depender da complexidade do forjamento e da disponibilidade de pedras específicas).',
      },
      {
        id: 'faq-04',
        question: 'Como são realizados os envios e as entregas fora da cidade?',
        answer: 'Todas as remessas contam com seguro integral e embalagem de madeira maciça numerada, entregues diretamente em mãos com confirmação protocolada.',
      },
    ],
  },

  ctaFinal: {
    enabled: true,
    statement: {
      leading: 'O valor das coisas feitas para',
      highlight: 'permanecer',
      trailing: 'ao longo de gerações.',
    },
    description: 'Entre em contato para conversar sobre um projeto sob medida ou agendar um café no ateliê.',
    primaryAction: {
      label: 'Iniciar uma Conversa',
      href: '#visite',
    },
    secondaryNote: 'Atendimento com hora marcada · Informação do cliente',
  },

  rodape: {
    enabled: true,
    brandSummary: 'Oficina de criação e joalheria autoral com foco na durabilidade, sobriedade e respeito à matéria.',
    colophonLeft: 'Nome da Marca · Todos os direitos reservados',
    colophonRight: 'Concebido com tipografia editorial e acabamento mineral',
    links: [
      { label: 'Início', href: '#' },
      { label: 'Capítulos', href: '#capitulos' },
      { label: 'Criações', href: '#servicos' },
      { label: 'Acervo', href: '#galeria' },
      { label: 'Contato', href: '#visite' },
    ],
  },
};
