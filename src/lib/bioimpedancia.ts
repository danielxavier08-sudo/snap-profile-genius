export type Sexo = "feminino" | "masculino";

export type Perfil = {
  idade: number | null;
  sexo: Sexo;
  altura: number | null;
  peso: number | null;
  pesoMin: number | null;
  pesoMax: number | null;
  agua: number | null;
  aguaMin: number | null;
  aguaMax: number | null;
  proteina: number | null;
  minerais: number | null;
  mineraisMin: number | null;
  mineraisMax: number | null;
  massaGorda: number | null;
  musculo: number | null;
  musculoMin: number | null;
  musculoMax: number | null;
  imc: number | null;
  imcMin: number | null;
  imcMax: number | null;
  gorduraPerc: number | null;
  gorduraPercMin: number | null;
  gorduraPercMax: number | null;
  adiposidade: number | null;
  adiposidadeMin: number | null;
  adiposidadeMax: number | null;
  massaLivreGordura: number | null;
  gorduraSubcutanea: number | null;
  idadeCorpo: number | null;
  visceral: number | null;
  ingestaoCalorica: number | null;
  bmr: number | null;
  controlePeso: number | null;
  controleGordura: number | null;
  controleMuscular: number | null;
};

export const perfilVazio: Perfil = {
  idade: null,
  sexo: "feminino",
  altura: null,
  peso: null,
  pesoMin: null,
  pesoMax: null,
  agua: null,
  aguaMin: null,
  aguaMax: null,
  proteina: null,
  minerais: null,
  mineraisMin: null,
  mineraisMax: null,
  massaGorda: null,
  musculo: null,
  musculoMin: null,
  musculoMax: null,
  imc: null,
  imcMin: null,
  imcMax: null,
  gorduraPerc: null,
  gorduraPercMin: null,
  gorduraPercMax: null,
  adiposidade: null,
  adiposidadeMin: null,
  adiposidadeMax: null,
  massaLivreGordura: null,
  gorduraSubcutanea: null,
  idadeCorpo: null,
  visceral: null,
  ingestaoCalorica: null,
  bmr: null,
  controlePeso: null,
  controleGordura: null,
  controleMuscular: null,
};

export type Produto = {
  nome: string;
  categoria: string;
  /** Explicação didática do que o produto é e como age no corpo. */
  comoAge: string;
  beneficios: string[];
  /** O que a pessoa pode perceber, e em quanto tempo, com uso contínuo. */
  resultadoEsperado: string;
  comoUsar: string;
  /** Contraindicações e cuidados reais — sempre mostrados ao cliente. */
  cuidados: string;
};

export const produtos = {
  spirulina: {
    nome: "Picolinato de Cromo",
    categoria: "Controle de peso / metabolismo",
    comoAge:
      "O cromo participa do metabolismo de carboidratos, proteínas e gorduras. Ele não emagrece sozinho; pode ser apenas um apoio modesto quando alimentação e atividade física já estão ajustadas.",
    beneficios: [
      "Apoia o metabolismo dos macronutrientes",
      "Não contém estimulantes",
      "Pode complementar uma rotina alimentar estruturada",
    ],
    resultadoEsperado:
      "O benefício tende a ser pequeno e gradual; redução de gordura depende principalmente da alimentação, sono e movimento.",
    comoUsar: "Conforme a dose indicada no rótulo, junto de uma refeição.",
    cuidados:
      "Não indicado na gravidez e amamentação sem orientação. Quem tem doença renal ou hepática, ou usa medicação para diabetes, deve falar com o médico antes.",
  },
  curcuma: {
    nome: "Cúrcuma Máxima",
    categoria: "Antioxidante / anti-inflamatório",
    comoAge:
      "O excesso de gordura, principalmente a que fica em volta dos órgãos, mantém o corpo num estado de inflamação leve e constante. A curcumina age justamente nessa inflamação de baixo grau e no estresse oxidativo das células.",
    beneficios: [
      "Ação antioxidante e anti-inflamatória natural",
      "Ajuda no desconforto das articulações sobrecarregadas pelo peso",
      "Apoia a função do fígado, sobrecarregado quando há gordura em excesso",
    ],
    resultadoEsperado:
      "Sensação de menos peso e menos dor nas juntas em cerca de 4 a 8 semanas de uso contínuo.",
    comoUsar: "1 dose ao dia junto de uma refeição com gordura, o que melhora a absorção.",
    cuidados:
      "Evite se usa anticoagulante (varfarina e similares), se tem pedra na vesícula ou obstrução das vias biliares, e nos 15 dias antes de uma cirurgia. Suspenda se houver azia persistente.",
  },
  creatina: {
    nome: "Creatina pura 100%",
    categoria: "Performance / força muscular",
    comoAge:
      "A creatina recarrega a energia rápida do músculo. Com mais energia disponível, você sustenta mais repetições no treino, e é esse estímulo maior que constrói músculo — o suplemento mais estudado do mundo para isso.",
    beneficios: [
      "Aumenta força e rendimento nos treinos",
      "Favorece o ganho de massa magra, o que eleva o gasto de energia em repouso",
      "Ajuda a preservar músculo em fase de perda de peso",
    ],
    resultadoEsperado:
      "Mais força em 2 a 4 semanas. Um pequeno aumento de peso no início é água dentro do músculo, não gordura — e aparece como massa muscular na próxima medição.",
    comoUsar: "3 a 5 g por dia, todos os dias, em qualquer horário, com bastante água.",
    cuidados:
      "Quem tem doença renal ou faz uso de remédios que afetam os rins deve consultar o médico antes. Precisa de boa ingestão de água todos os dias.",
  },
  verisol: {
    nome: "Colágeno Verisol + Vitaminas e Minerais",
    categoria: "Suporte estrutural / pele e massa magra",
    comoAge:
      "O Verisol é colágeno quebrado em peptídeos pequenos, que o corpo absorve e usa como matéria-prima para a pele e os tecidos de sustentação. A vitamina C do produto é obrigatória para o corpo montar colágeno novo.",
    beneficios: [
      "Peptídeos com absorção comprovada em estudos",
      "Ajuda na firmeza da pele, nas unhas e nos cabelos",
      "Dá suporte estrutural a quem está ganhando massa magra ou perdendo peso",
    ],
    resultadoEsperado: "Pele e unhas mais firmes a partir de 8 a 12 semanas de uso diário.",
    comoUsar: "1 dose ao dia, de preferência sempre no mesmo horário.",
    cuidados:
      "Colágeno é de origem animal — não serve para dieta vegana. Quem tem alergia a peixe ou boi deve conferir a origem no rótulo. Não substitui a proteína das refeições.",
  },
  flexigold: {
    nome: "Flexigold Special Pack (Colágeno Tipo 2 + Vitaminas)",
    categoria: "Articulações (uso geral / preventivo)",
    comoAge:
      "A cartilagem é a almofada entre os ossos e é feita principalmente de colágeno tipo 2. Esse tipo específico atua na cartilagem, diferente do colágeno de pele; as vitaminas completam o suporte.",
    beneficios: [
      "Colágeno tipo 2 voltado à cartilagem das juntas",
      "Ajuda na mobilidade do joelho, quadril e coluna",
      "Uso preventivo para quem quer voltar a se movimentar mais",
    ],
    resultadoEsperado: "Mais conforto ao subir escadas e caminhar, em geral de 8 a 12 semanas.",
    comoUsar: "Conforme o pack, 1 dose ao dia de forma contínua.",
    cuidados:
      "Não trata artrite nem substitui remédio prescrito. Dor que piora, inchaço ou travamento da junta pedem avaliação médica.",
  },
  colageno2: {
    nome: "Colágeno Tipo 2 (30 cáps)",
    categoria: "Articulações (carga alta)",
    comoAge:
      "Cada quilo extra multiplica a força que passa pelo joelho a cada passo. O colágeno tipo 2 fornece material para a cartilagem que está recebendo essa carga maior.",
    beneficios: [
      "Protege a cartilagem sobrecarregada pelo peso corporal",
      "Auxilia na mobilidade e no conforto ao caminhar",
      "Prático: apenas 1 cápsula ao dia",
    ],
    resultadoEsperado: "Menos desconforto nas juntas de carga em cerca de 8 a 12 semanas.",
    comoUsar: "1 cápsula ao dia, sempre no mesmo horário.",
    cuidados:
      "Origem animal. Se houver dor forte, calor ou inchaço na junta, procure avaliação médica antes de suplementar.",
  },
  calcivitam: {
    nome: "Calcivitam Flex + Colágeno Tipo II",
    categoria: "Ossos / minerais",
    comoAge:
      "O cálcio é o mineral que dá rigidez ao osso; a vitamina D faz o intestino absorver esse cálcio e a vitamina K ajuda a direcioná-lo para o osso. Sozinho, o cálcio é mal aproveitado.",
    beneficios: [
      "Cálcio com vitaminas D e K para a saúde óssea",
      "Com colágeno tipo II, que também sustenta as articulações",
      "Repõe minerais quando a bioimpedância mostra conteúdo mineral baixo",
    ],
    resultadoEsperado:
      "O conteúdo mineral responde lentamente: espere alguns meses para ver mudança na medição.",
    comoUsar: "Conforme o rótulo, junto de uma refeição.",
    cuidados:
      "Quem tem pedra nos rins, cálcio alto no sangue, problema de paratireoide ou usa remédio de tireoide/antibiótico deve conversar com o médico — o cálcio pode reduzir a absorção desses medicamentos (separe por 4 horas).",
  },
  magplus: {
    nome: "Mag Plus Dimalato - 60 cáps",
    categoria: "Minerais / eletrólitos",
    comoAge:
      "O magnésio participa do relaxamento do músculo depois da contração e do equilíbrio de líquidos dentro da célula. Falta dele aparece como cãibra, tremor e cansaço.",
    beneficios: [
      "Magnésio dimalato, forma de boa absorção e boa tolerância",
      "Ajuda a reduzir cãibras e fadiga muscular",
      "Apoia o equilíbrio de eletrólitos e a hidratação das células",
    ],
    resultadoEsperado: "Menos cãibras e melhor qualidade do sono em 2 a 4 semanas.",
    comoUsar: "1 a 2 cápsulas ao dia, conforme o rótulo, de preferência à noite.",
    cuidados:
      "Contraindicado em doença renal crônica sem orientação médica. Pode soltar o intestino; se acontecer, reduza a dose.",
  },
  magplusSupra: {
    nome: "Magnésio Dimalato Supra - 60 cáps",
    categoria: "Minerais / eletrólitos",
    comoAge:
      "O magnésio entra em centenas de reações do metabolismo, inclusive na produção de energia e na regulação do sistema nervoso — por isso a falta dele mistura cansaço, sono ruim e cãibra.",
    beneficios: [
      "Forma quelada, com boa biodisponibilidade",
      "Participa da produção de energia do corpo",
      "Ajuda no sono, no estresse e nas cãibras",
    ],
    resultadoEsperado: "Sono mais profundo e menos tensão muscular em 2 a 4 semanas.",
    comoUsar: "1 a 2 cápsulas ao dia, conforme o rótulo.",
    cuidados:
      "Evite por conta própria em doença renal. Pode interagir com alguns antibióticos — separe as tomadas por 2 horas.",
  },
  hidrasais: {
    nome: "Hidrasais",
    categoria: "Hidratação / reposição eletrolítica",
    comoAge:
      "Beber água sem sais faz o corpo eliminar boa parte dela pela urina. Sódio, potássio e magnésio são o que mantém a água dentro do corpo e das células.",
    beneficios: [
      "Reposição rápida de sódio, potássio e magnésio",
      "Ajuda a subir a água corporal e a disposição",
      "Prático para dias de calor, treino ou muito suor",
    ],
    resultadoEsperado:
      "Mais energia e boca menos seca em poucos dias; a água corporal tende a subir já na próxima medição.",
    comoUsar: "1 envelope diluído em água, nos dias de mais calor, treino ou baixa ingestão de líquido.",
    cuidados:
      "Contém sódio: quem tem pressão alta, insuficiência cardíaca ou doença renal deve falar com o médico antes de usar todos os dias.",
  },
  vitcZinco: {
    nome: "Vitamina C + Zinco",
    categoria: "Imunidade",
    comoAge:
      "A vitamina C protege as células da oxidação e é necessária para produzir colágeno; o zinco é peça central na multiplicação das células de defesa.",
    beneficios: [
      "Dupla clássica de suporte à imunidade",
      "Vitamina C com ação antioxidante",
      "Zinco participa da defesa e da cicatrização",
    ],
    resultadoEsperado: "Suporte contínuo à imunidade; sensação de menos recaídas ao longo dos meses.",
    comoUsar: "1 dose ao dia, junto de uma refeição.",
    cuidados:
      "Zinco em excesso por longos períodos atrapalha a absorção de cobre; não passe da dose do rótulo. Doses altas de vitamina C pedem cautela em quem tem histórico de pedra nos rins.",
  },
  kitSupra: {
    nome: "Polivitamínico Imunidade Supra",
    categoria: "Imunidade completa",
    comoAge:
      "Reúne as vitaminas e minerais mais ligados à defesa do corpo, cuja absorção naturalmente cai com a idade e com dietas restritivas.",
    beneficios: [
      "Vitaminas A, C, D e E em um só protocolo",
      "Com zinco e selênio, minerais-chave da imunidade",
      "Bom custo-benefício em vez de comprar item por item",
    ],
    resultadoEsperado: "Suporte constante à defesa do corpo, percebido ao longo de meses.",
    comoUsar: "Conforme o kit, normalmente 1 dose ao dia com a refeição.",
    cuidados:
      "Vitamina A em dose alta é contraindicada na gravidez. Não use junto de outro polivitamínico para não somar doses. Selênio tem margem estreita: siga o rótulo.",
  },
  supraAZ: {
    nome: "Supra AZ Polivitamínico - 60 cáps",
    categoria: "Polivitamínico",
    comoAge:
      "Cobre as lacunas do dia a dia: quando a alimentação varia muito, faltam pequenas quantidades de várias vitaminas ao mesmo tempo, e é isso que costuma virar cansaço.",
    beneficios: [
      "Vitaminas e minerais de A a zinco em 1 cápsula",
      "Complementa a alimentação sem exagero de doses",
      "Mais energia e disposição na rotina",
    ],
    resultadoEsperado: "Mais disposição em 3 a 6 semanas de uso diário.",
    comoUsar: "1 cápsula ao dia, junto de uma refeição.",
    cuidados: "Não combine com outro polivitamínico. Em gravidez, use apenas fórmula indicada pelo obstetra.",
  },
  supraHomem: {
    nome: "Supra Homem Polivitamínico - 60 cáps",
    categoria: "Polivitamínico",
    comoAge:
      "Fórmula ajustada às necessidades masculinas, com zinco e selênio, minerais ligados à produção hormonal e à saúde da próstata, e sem excesso de ferro, que o homem raramente precisa repor.",
    beneficios: [
      "Zinco, que contribui para a manutenção da testosterona",
      "Vitaminas do complexo B para energia no dia a dia",
      "Suporte antioxidante e à imunidade",
    ],
    resultadoEsperado: "Mais disposição e constância de energia em 3 a 6 semanas.",
    comoUsar: "1 cápsula ao dia com a refeição.",
    cuidados: "Não use junto de outro multivitamínico. Não trata queda de testosterona diagnosticada.",
  },
  supraMulher: {
    nome: "Supra Mulher Polivitamínico - 60 cáps",
    categoria: "Polivitamínico",
    comoAge:
      "Traz ferro e ácido fólico, os dois nutrientes que a mulher em idade fértil perde ou consome mais, além das vitaminas de suporte a pele, cabelo e imunidade.",
    beneficios: [
      "Ferro e ácido fólico, importantes no ciclo menstrual",
      "Suporte a pele, cabelos e unhas",
      "Complexo B para energia e humor",
    ],
    resultadoEsperado: "Menos cansaço ao longo de 4 a 8 semanas, sobretudo se havia perda de ferro.",
    comoUsar: "1 cápsula ao dia com a refeição; evite tomar junto de café ou leite, que reduzem o ferro.",
    cuidados:
      "Quem já passou da menopausa ou tem ferro alto (hemocromatose) não deve suplementar ferro sem exame. Ferro pode causar prisão de ventre e escurecer as fezes.",
  },
  b12: {
    nome: "Vitamina B12 - Metilcobalamina Supra - 60 cáps",
    categoria: "Energia / metabolismo",
    comoAge:
      "A B12 é necessária para formar as células do sangue que levam oxigênio e para o funcionamento dos nervos. Sem oxigênio chegando bem, o corpo vira cansaço mesmo dormindo.",
    beneficios: [
      "Metilcobalamina, a forma ativa e de melhor aproveitamento",
      "Ajuda a reduzir cansaço e fadiga",
      "Importante para o sistema nervoso e a memória",
    ],
    resultadoEsperado: "Mais energia em 3 a 6 semanas quando havia falta real da vitamina.",
    comoUsar: "1 cápsula ao dia, de manhã.",
    cuidados:
      "Quem usa metformina ou remédio para gastrite/refluxo (omeprazol e similares) e quem é vegetariano tem mais risco de falta — vale dosar a B12 no sangue. Formigamento persistente nas mãos e pés pede avaliação médica.",
  },
  coq10: {
    nome: "Coenzima Q10",
    categoria: "Energia celular",
    comoAge:
      "A coenzima Q10 trabalha dentro da mitocôndria, a usina de energia da célula. A produção natural dela cai com a idade e também com o uso de estatinas para colesterol.",
    beneficios: [
      "Participa diretamente da produção de energia celular",
      "Antioxidante que protege o coração e os vasos",
      "Dose concentrada de 200 mg por cápsula",
    ],
    resultadoEsperado: "Menos fadiga e melhor tolerância ao esforço em 4 a 8 semanas.",
    comoUsar: "1 cápsula ao dia junto de uma refeição com gordura, que é necessária para absorver.",
    cuidados:
      "Pode reduzir o efeito da varfarina; quem usa anticoagulante precisa de orientação médica. Não suspenda remédio de coração ou colesterol por conta do suplemento.",
  },
  psylax: {
    nome: "Psylax Psyllium (Plantago Ovata) 180g",
    categoria: "Fibras / saúde intestinal",
    comoAge:
      "O psyllium absorve água e forma um gel no estômago. Esse gel dá saciedade, atrasa a absorção do açúcar e dá volume ao bolo fecal, regulando o intestino.",
    beneficios: [
      "Aumenta a saciedade entre as refeições",
      "Regula o funcionamento do intestino",
      "Contribui para melhorar colesterol e glicemia",
    ],
    resultadoEsperado: "Intestino mais regular em cerca de 1 semana; menos fome já nos primeiros dias.",
    comoUsar: "1 dose em um copo cheio de água, bebendo na hora, 20 minutos antes da refeição.",
    cuidados:
      "Tome sempre com bastante água: sem líquido suficiente pode entalar. Não use em caso de obstrução intestinal ou dificuldade de engolir. Separe 2 horas de outros medicamentos, porque a fibra reduz a absorção.",
  },
  serenizz: {
    nome: "Serenizz Melatonina - 60 cáps",
    categoria: "Sono / recuperação",
    comoAge:
      "A melatonina é o sinal químico que avisa o corpo que é noite. Ela ajuda a pegar no sono mais rápido, e é durante o sono profundo que o corpo recupera músculo e regula os hormônios do apetite.",
    beneficios: [
      "Ajuda a reduzir o tempo para adormecer",
      "Melhora a sensação de sono reparador",
      "Sono melhor favorece recuperação e controle do apetite",
    ],
    resultadoEsperado: "Adormecer mais rápido já nas primeiras noites.",
    comoUsar: "1 cápsula 30 a 60 minutos antes de deitar, no escuro e sem tela.",
    cuidados:
      "Não use antes de dirigir. Evite na gravidez, amamentação e em doenças autoimunes sem orientação. Pode interagir com anticoagulantes e sedativos. Insônia que dura meses merece investigação médica.",
  },
  cranberry: {
    nome: "Cranberry 60 cáps",
    categoria: "Saúde urinária",
    comoAge:
      "As proantocianidinas do cranberry dificultam que as bactérias se fixem na parede da bexiga, o que reduz a chance de infecções voltarem.",
    beneficios: [
      "Aliado tradicional da saúde do trato urinário",
      "Rico em antioxidantes",
      "Usado como apoio para quem tem infecções urinárias de repetição",
    ],
    resultadoEsperado: "Efeito preventivo, percebido ao longo de meses de uso contínuo.",
    comoUsar: "1 a 2 cápsulas ao dia, com bastante água.",
    cuidados:
      "Não trata infecção urinária: ardência, febre ou dor nas costas exigem médico e, muitas vezes, antibiótico. Cuidado com anticoagulantes e com histórico de pedra nos rins.",
  },
  psyllium: {
    nome: "Psyllium",
    categoria: "Fibras / saúde intestinal",
    comoAge: "O psyllium é uma fibra solúvel que absorve água e forma um gel, ajudando o trânsito intestinal e aumentando a saciedade.",
    beneficios: ["Ajuda a regular o intestino", "Pode aumentar a saciedade", "Contribui para o controle de colesterol e glicemia quando associado à alimentação"],
    resultadoEsperado: "O intestino pode responder em alguns dias; os efeitos metabólicos dependem do uso contínuo e da alimentação.",
    comoUsar: "Conforme o rótulo, sempre diluído e acompanhado de bastante água.",
    cuidados: "Não use com dificuldade para engolir ou suspeita de obstrução intestinal. Separe de medicamentos por pelo menos 2 horas.",
  },
  picolinatoCromo: {
    nome: "Picolinato de Cromo (outra apresentação)",
    categoria: "Metabolismo / controle alimentar",
    comoAge: "O cromo participa do metabolismo de carboidratos, proteínas e gorduras. Não emagrece sozinho e seu benefício tende a ser modesto.",
    beneficios: ["Apoio ao metabolismo de macronutrientes", "Opção sem fibras para quem não tolera psyllium", "Pode complementar uma rotina alimentar estruturada"],
    resultadoEsperado: "O benefício não é imediato e só deve ser avaliado junto da alimentação e das próximas medições.",
    comoUsar: "Use apenas na dose indicada no rótulo e junto de uma refeição.",
    cuidados: "Quem usa remédio para diabetes, tem doença renal ou hepática, está grávida ou amamentando deve consultar um profissional.",
  },
  complexoB: {
    nome: "Complexo B Supra",
    categoria: "Energia / metabolismo",
    comoAge: "As vitaminas do complexo B participam das reações que transformam os alimentos em energia, mas não funcionam como estimulante.",
    beneficios: ["Complementa várias vitaminas B em uma fórmula", "Apoia o metabolismo energético", "Alternativa de manutenção quando não há indicação específica de B12"],
    resultadoEsperado: "Pode ajudar quando existe ingestão insuficiente; sem deficiência, não é esperado aumento marcante de energia.",
    comoUsar: "Conforme o rótulo, geralmente junto de uma refeição.",
    cuidados: "Não combine com outros polivitamínicos sem conferir as doses. Cansaço persistente precisa de avaliação e exames.",
  },
  seniorSupra: {
    nome: "Polivitamínico Sênior Supra",
    categoria: "Polivitamínico 60+",
    comoAge: "Reúne micronutrientes de manutenção em uma apresentação voltada à fase madura, sem substituir alimentação ou exames.",
    beneficios: ["Opção de manutenção para pessoas com 60 anos ou mais", "Concentra vitaminas e minerais em uma rotina simples", "Evita montar vários suplementos separados"],
    resultadoEsperado: "Benefícios são mais prováveis quando havia ingestão insuficiente; não deve prometer melhora sem deficiência.",
    comoUsar: "Conforme a dose do rótulo, junto de uma refeição.",
    cuidados: "Não combine com outro polivitamínico. Confirme com médico ou farmacêutico se usa anticoagulante ou vários medicamentos.",
  },
  magBisglicinato: {
    nome: "Mag Plus Bisglicinato",
    categoria: "Magnésio / manutenção",
    comoAge: "O magnésio participa da função muscular e nervosa; a forma bisglicinato costuma ter boa tolerância digestiva.",
    beneficios: ["Alternativa de magnésio com boa tolerância", "Apoia a função muscular", "Participa do funcionamento do sistema nervoso"],
    resultadoEsperado: "A percepção depende de haver baixa ingestão ou deficiência; não é um sedativo.",
    comoUsar: "Conforme o rótulo, sem ultrapassar a dose diária.",
    cuidados: "Doença renal exige orientação. Separe de alguns antibióticos e do remédio de tireoide conforme orientação profissional.",
  },
  magBiotreonato: {
    nome: "Mag Plus Biotreonato",
    categoria: "Magnésio / bem-estar",
    comoAge: "É uma apresentação de magnésio voltada ao aporte do mineral; a bioimpedância não consegue mostrar qual forma é necessária.",
    beneficios: ["Alternativa dentro da linha Mag Plus", "Apoia a ingestão diária de magnésio", "Pode ser escolhida conforme tolerância e orientação"],
    resultadoEsperado: "Não há garantia de melhora de memória ou sono; o resultado depende da necessidade individual.",
    comoUsar: "Conforme o rótulo e, de preferência, com orientação profissional.",
    cuidados: "Não use em doença renal sem avaliação. Não some várias formas de magnésio no mesmo dia.",
  },
  omega3: {
    nome: "Ômega 3 (óleo de peixe)",
    categoria: "Qualidade de vida / gorduras essenciais",
    comoAge: "EPA e DHA são gorduras que participam das membranas celulares. A bioimpedância isolada não confirma necessidade nem substitui exame de sangue.",
    beneficios: ["Opção de suporte nutricional geral", "Fonte de EPA e DHA", "Pode ser considerada quando o consumo de peixes é baixo"],
    resultadoEsperado: "Não costuma gerar sensação imediata; a avaliação adequada depende da dieta e, quando indicado, de exames.",
    comoUsar: "Conforme o teor de EPA e DHA informado no rótulo, junto de uma refeição.",
    cuidados: "Alergia a peixe e uso de anticoagulante exigem orientação. Não é indicação automática para colesterol alto.",
  },
  vitaminaD3: {
    nome: "Vitamina D3 Supra",
    categoria: "Ossos / vitamina D",
    comoAge: "A vitamina D ajuda o intestino a absorver cálcio, mas a dose correta depende de exame de sangue e avaliação clínica.",
    beneficios: ["Apoia a absorção de cálcio", "Participa da saúde óssea e muscular", "Alternativa individual quando há indicação profissional"],
    resultadoEsperado: "A correção deve ser confirmada por exame; não é possível medir vitamina D pela bioimpedância.",
    comoUsar: "Somente na dose do rótulo ou prescrita, junto de uma refeição.",
    cuidados: "Doses altas podem causar excesso de cálcio e lesão renal. Não combinar fórmulas com vitamina D sem somar as doses.",
  },
  colageno2Supra: {
    nome: "Colágeno Tipo 2 Supra",
    categoria: "Articulações",
    comoAge: "É outra apresentação de colágeno tipo 2 voltada ao suporte da cartilagem; não reconstrói sozinho uma articulação lesionada.",
    beneficios: ["Alternativa simples para suporte articular", "Foco específico em cartilagem", "Pode ser escolhida conforme fórmula e apresentação"],
    resultadoEsperado: "Quando há benefício, ele costuma ser gradual, após semanas de uso contínuo.",
    comoUsar: "Conforme o rótulo, sem associar vários colágenos tipo 2 ao mesmo tempo.",
    cuidados: "Dor forte, inchaço ou limitação de movimento exigem avaliação médica. Confira a origem em caso de alergia.",
  },
  colagenoHidro: {
    nome: "Verisol + Ácido Hialurônico + Q10 + 17 vitaminas e minerais",
    categoria: "Beleza / pele",
    comoAge:
      "Os peptídeos de colágeno Verisol fornecem aminoácidos usados pela pele; a fórmula também reúne ácido hialurônico, Q10, vitaminas e minerais.",
    beneficios: [
      "Fácil absorção e fácil de incluir na rotina",
      "Auxilia na elasticidade e na hidratação da pele",
      "Disponível em diferentes sabores e apresentações no catálogo",
    ],
    resultadoEsperado: "Pele mais hidratada e elástica a partir de 8 a 12 semanas.",
    comoUsar: "1 dose ao dia diluída em água, sempre no mesmo horário.",
    cuidados: "Origem animal, não vegano. Não substitui proteína da refeição nem protetor solar.",
  },
} satisfies Record<string, Produto>;

export type Alternativa = {
  nome: string;
  quandoEscolher: string;
};

export type Recomendacao = Produto & {
  prioridade: number;
  /** Frase curta com o dado que gerou a indicação. */
  motivo: string;
  /** Explicação completa ligando o dado da medição ao produto. */
  detalhe: string;
  origem: "bioimpedancia" | "idade";
  alternativas: Alternativa[];
};

export type Leitura = {
  rotulo: string;
  situacao: "abaixo" | "normal" | "acima" | "atencao";
  texto: string;
};

export type Resultado = {
  bloqueadoMenorIdade: boolean;
  alerta: string | null;
  faixaIdade: string | null;
  leituras: Leitura[];
  recomendacoes: Recomendacao[];
};

const abaixo = (v: number | null, min: number | null) => v !== null && min !== null && v < min;
const acima = (v: number | null, max: number | null) => v !== null && max !== null && v > max;
const num = (v: number | null) => (v === null ? "-" : String(v));

export function faixaDeIdade(idade: number | null): string | null {
  if (idade === null) return null;
  if (idade < 30) return "18–29 anos";
  if (idade < 45) return "30–44 anos";
  if (idade < 60) return "45–59 anos";
  return "60+ anos";
}

/** BMR previsto por Mifflin-St Jeor, usado apenas para comparar com o valor medido. */
function bmrPrevisto(p: Perfil): number | null {
  if (p.peso === null || p.altura === null || p.idade === null) return null;
  const base = 10 * p.peso + 6.25 * p.altura - 5 * p.idade;
  return Math.round(p.sexo === "masculino" ? base + 5 : base - 161);
}

function alternativasPara(produto: Produto, p: Perfil): Alternativa[] {
  const opcoes: Record<string, Alternativa[]> = {
    [produtos.spirulina.nome]: [
      { nome: produtos.picolinatoCromo.nome, quandoEscolher: "se prefere cápsulas sem fibra; o efeito no peso é modesto e não substitui alimentação" },
      { nome: produtos.psyllium.nome, quandoEscolher: "se a prioridade também é intestino preso e você consegue beber bastante água" },
      { nome: produtos.psylax.nome, quandoEscolher: "outra apresentação de Plantago ovata; escolha uma fibra, não as duas juntas" },
    ],
    [produtos.psylax.nome]: [
      { nome: produtos.psyllium.nome, quandoEscolher: "mesma fibra-base em outra apresentação; compare dose e modo de preparo no rótulo" },
      { nome: produtos.picolinatoCromo.nome, quandoEscolher: "se não tolera fibras; não oferece o mesmo benefício intestinal" },
    ],
    [produtos.creatina.nome]: [],
    [produtos.magplus.nome]: [
      { nome: produtos.magBisglicinato.nome, quandoEscolher: "se busca outra forma com boa tolerância digestiva" },
      { nome: produtos.magBiotreonato.nome, quandoEscolher: "se houver orientação para essa apresentação; não associe várias formas" },
    ],
    [produtos.magplusSupra.nome]: [
      { nome: produtos.magBisglicinato.nome, quandoEscolher: "se a tolerância digestiva for a principal preocupação" },
      { nome: produtos.magplus.nome, quandoEscolher: "se prefere magnésio dimalato; não use os dois juntos" },
    ],
    [produtos.flexigold.nome]: [
      { nome: produtos.colageno2Supra.nome, quandoEscolher: "se busca uma fórmula mais simples focada em colágeno tipo 2" },
      { nome: "FlexiGold Condro", quandoEscolher: "somente após comparar a composição e confirmar que ela combina com sua necessidade" },
    ],
    [produtos.colageno2.nome]: [
      { nome: produtos.colageno2Supra.nome, quandoEscolher: "outra apresentação com o mesmo objetivo geral; compare composição e dose" },
      { nome: produtos.flexigold.nome, quandoEscolher: "se prefere um conjunto com vitaminas, sem duplicar fórmulas" },
    ],
    [produtos.calcivitam.nome]: [
      { nome: produtos.vitaminaD3.nome, quandoEscolher: "apenas quando exame ou profissional indicar vitamina D isolada" },
      { nome: "Cálcio + Magnésio + Zinco + D3", quandoEscolher: "se a composição completa e as doses forem adequadas após avaliação" },
    ],
    [produtos.b12.nome]: [
      { nome: "Cobalamax", quandoEscolher: "outra apresentação de vitamina B12; compare forma e dose no rótulo" },
      { nome: produtos.complexoB.nome, quandoEscolher: "para manutenção ampla, não para tratar deficiência de B12 confirmada" },
    ],
    [produtos.coq10.nome]: [
      { nome: "Coenzima Q10 30 cáps", quandoEscolher: "mesmo ativo em outra apresentação; compare miligramas por dose" },
      { nome: produtos.complexoB.nome, quandoEscolher: "se a meta é manutenção nutricional geral; não tem a mesma ação da Q10" },
    ],
    [produtos.supraAZ.nome]: [
      { nome: p.idade !== null && p.idade >= 60 ? produtos.seniorSupra.nome : (p.sexo === "masculino" ? produtos.supraHomem.nome : produtos.supraMulher.nome), quandoEscolher: "se prefere uma fórmula direcionada à sua fase de vida ou sexo" },
    ],
    [produtos.kitSupra.nome]: [
      { nome: "Polivitamínico Imunidade Supra", quandoEscolher: "se prefere uma única fórmula em vez de um kit; não use ambos" },
      { nome: produtos.vitcZinco.nome, quandoEscolher: "opção mais simples, sem duplicar com outro polivitamínico" },
    ],
    [produtos.hidrasais.nome]: [
      { nome: "Hidrasais em outro sabor ou apresentação", quandoEscolher: "o objetivo é o mesmo; escolha apenas pela composição, dose e preferência" },
    ],
  };
  return (opcoes[produto.nome] ?? []).slice(0, 3);
}

export function recomendar(p: Perfil): Resultado {
  if (p.idade !== null && p.idade < 18) {
    return {
      bloqueadoMenorIdade: true,
      alerta: null,
      faixaIdade: null,
      leituras: [],
      recomendacoes: [],
    };
  }

  const lista: Recomendacao[] = [];
  const add = (
    produto: Produto,
    prioridade: number,
    motivo: string,
    detalhe: string,
    origem: "bioimpedancia" | "idade" = "bioimpedancia",
  ) => {
    const existente = lista.find((r) => r.nome === produto.nome);
    if (existente) {
      if (prioridade < existente.prioridade) {
        existente.prioridade = prioridade;
        existente.motivo = motivo;
        existente.detalhe = detalhe;
        existente.origem = origem;
      }
      return;
    }
    lista.push({ ...produto, prioridade, motivo, detalhe, origem, alternativas: [] });
  };

  const leituras: Leitura[] = [];
  const ler = (rotulo: string, situacao: Leitura["situacao"], texto: string) =>
    leituras.push({ rotulo, situacao, texto });

  // Segurança: se a pessoa está abaixo do peso ou precisa ganhar peso,
  // nenhum produto de redução de apetite/peso é indicado.
  const baixoPeso = abaixo(p.imc, p.imcMin) || (p.controlePeso !== null && p.controlePeso > 0);

  // ---- Indicadores da bioimpedância ----
  const gorduraAlta = acima(p.gorduraPerc, p.gorduraPercMax) || (p.controleGordura !== null && p.controleGordura < 0);

  if (gorduraAlta) {
    ler(
      "Relação de gordura",
      "acima",
      `Seu percentual de gordura (${num(p.gorduraPerc)}%) está acima do limite da faixa normal${
        p.gorduraPercMax !== null ? ` (${p.gorduraPercMax}%)` : ""
      }${p.controleGordura !== null && p.controleGordura < 0 ? `, e o próprio aparelho sugere reduzir ${Math.abs(p.controleGordura)} kg de gordura` : ""}. Gordura em excesso aumenta o risco de pressão alta, diabetes e sobrecarga das articulações.`,
    );
    if (!baixoPeso) {
      add(
        produtos.spirulina,
        1,
        `Gordura em ${num(p.gorduraPerc)}%, acima da faixa normal`,
        "O cromo participa do metabolismo de carboidratos, proteínas e gorduras. Seu efeito costuma ser modesto: alimentação, sono e atividade física continuam sendo os principais fatores para reduzir gordura.",
      );
      add(
        produtos.psylax,
        2,
        "Apoio à saciedade e ao intestino",
        "A fibra do psyllium forma um gel que ocupa espaço no estômago e atrasa a absorção do açúcar. É o suporte mais simples e barato para comer menos nas refeições e regular o intestino durante a dieta.",
      );
    }
    add(
      produtos.curcuma,
      2,
      "Gordura em excesso mantém inflamação leve no corpo",
      "Gordura acumulada pode contribuir para inflamação de baixo grau e sobrecarga das articulações. A cúrcuma pode ser considerada como apoio, sem substituir alimentação, movimento ou tratamento.",
    );
  }

  if (p.visceral !== null) {
    if (p.visceral > 9) {
      ler(
        "Gordura visceral",
        p.visceral >= 15 ? "atencao" : "acima",
        `Nível ${p.visceral}: acima do normal (até 9). Essa é a gordura que fica em volta dos órgãos e é a mais ligada a diabetes, colesterol alto e problemas do coração — e também a que responde mais rápido quando se muda a rotina.`,
      );
      add(
        produtos.curcuma,
        1,
        `Gordura visceral em nível ${p.visceral} (normal até 9)`,
        "A gordura visceral é a mais inflamatória do corpo. Reduzir essa inflamação é parte do tratamento, junto de alimentação e movimento — e é aí que a curcumina entra como apoio diário.",
      );
      if (!baixoPeso) {
        add(
          produtos.spirulina,
          1,
          `Gordura visceral em nível ${p.visceral}`,
          "A redução da gordura visceral depende principalmente de alimentação, sono e atividade física. O cromo pode ser um apoio modesto ao metabolismo, mas não age sozinho.",
        );
      }
    } else {
      ler("Gordura visceral", "normal", `Nível ${p.visceral}: dentro do normal (até 9). Bom sinal de saúde metabólica.`);
    }
  }

  const musculoBaixo = abaixo(p.musculo, p.musculoMin) || (p.controleMuscular !== null && p.controleMuscular > 0);
  if (musculoBaixo) {
    ler(
      "Massa muscular",
      "abaixo",
      `Sua massa muscular (${num(p.musculo)} kg) está abaixo da faixa normal${
        p.musculoMin !== null ? ` (mínimo ${p.musculoMin} kg)` : ""
      }. Músculo é o que sustenta as articulações, protege de quedas e queima energia em repouso — ganhar músculo facilita perder gordura.`,
    );
    add(
      produtos.creatina,
      1,
      "Massa muscular abaixo da faixa normal",
      "Com músculo abaixo do esperado, o objetivo é treinar com mais estímulo. A creatina é o suplemento mais estudado do mundo para isso: ela dá energia rápida ao músculo, você sustenta mais repetições e o ganho aparece na próxima medição.",
    );
    add(
      produtos.verisol,
      2,
      "Suporte estrutural durante o ganho de massa",
      "Ganhar massa magra não é só músculo: pele, tendões e tecidos de sustentação também precisam de matéria-prima. Os peptídeos de colágeno com vitamina C cobrem essa parte estrutural.",
    );
  } else if (p.musculo !== null && p.musculoMin !== null) {
    ler("Massa muscular", "normal", `${p.musculo} kg, dentro da faixa normal. O objetivo aqui é manter.`);
  }

  if (abaixo(p.minerais, p.mineraisMin)) {
    ler(
      "Minerais",
      "abaixo",
      `Conteúdo mineral de ${num(p.minerais)} kg, abaixo da faixa normal${
        p.mineraisMin !== null ? ` (mínimo ${p.mineraisMin} kg)` : ""
      }. A maior parte dos minerais do corpo está nos ossos — valor baixo é um sinal de atenção para a saúde óssea.`,
    );
    add(
      produtos.calcivitam,
      2,
      `Minerais em ${num(p.minerais)} kg, abaixo da faixa normal`,
      "Osso não se recupera só com cálcio: é preciso vitamina D para absorver e vitamina K para direcionar esse cálcio ao osso. O Calcivitam reúne os três, mais colágeno tipo II para as articulações.",
    );
    add(
      produtos.magplusSupra,
      2,
      "Magnésio é um dos minerais que sustentam o osso",
      "Cerca de metade do magnésio do corpo está nos ossos, e ele também é necessário para ativar a vitamina D. Repor magnésio faz o cálcio e a vitamina D trabalharem melhor.",
    );
  }

  if (abaixo(p.agua, p.aguaMin)) {
    ler(
      "Água corporal",
      "abaixo",
      `${num(p.agua)} kg de água corporal, abaixo da faixa normal${
        p.aguaMin !== null ? ` (mínimo ${p.aguaMin} kg)` : ""
      }. Pouca água no corpo dá cansaço, dor de cabeça, cãibra e derruba o rendimento no treino.`,
    );
    add(
      produtos.hidrasais,
      1,
      `Água corporal em ${num(p.agua)} kg, abaixo do normal`,
      "Quando há perda de sais por suor, calor, vômitos ou diarreia, eletrólitos podem ajudar na reposição. Se não houve essa perda, água e alimentação costumam ser suficientes.",
    );
    add(
      produtos.magplus,
      2,
      "Magnésio ajuda a manter a água dentro da célula",
      "O magnésio é o mineral que regula a entrada de água e a contração muscular. Quando a água está baixa, cãibra e fadiga costumam vir junto — e é esse o alvo do magnésio dimalato.",
    );
  } else if (p.agua !== null && p.aguaMin !== null) {
    ler("Água corporal", "normal", `${p.agua} kg, dentro da faixa normal. Hidratação em bom nível.`);
  }

  if (p.idadeCorpo !== null && p.idade !== null && p.idadeCorpo > p.idade + 3) {
    ler(
      "Idade do corpo",
      "acima",
      `O aparelho estimou ${p.idadeCorpo} anos para um corpo de ${p.idade} anos. Essa diferença vem da combinação de gordura alta com pouco músculo — e é reversível.`,
    );
    add(
      produtos.flexigold,
      2,
      `Idade do corpo (${p.idadeCorpo}) acima da idade real (${p.idade})`,
      "Quando o corpo está funcionando acima da idade, as articulações são as primeiras a reclamar ao voltar a se movimentar. O colágeno tipo 2 com vitaminas protege a cartilagem nessa retomada.",
    );
  }

  const imcAlto = acima(p.imc, p.imcMax);
  if (imcAlto || acima(p.adiposidade, p.adiposidadeMax)) {
    ler(
      "IMC / adiposidade",
      p.imc !== null && p.imc >= 35 ? "atencao" : "acima",
      `IMC ${num(p.imc)}${p.imcMax !== null ? ` (limite ${p.imcMax})` : ""}. Cada quilo extra multiplica a força que passa pelo joelho a cada passo, além de aumentar o esforço do coração.`,
    );
    add(
      produtos.colageno2,
      2,
      "Peso acima do ideal sobrecarrega as cartilagens",
      "Com IMC acima da faixa, a cartilagem do joelho, do quadril e da coluna trabalha sob carga maior todos os dias. O colágeno tipo 2 fornece material para essa cartilagem enquanto o peso é reduzido.",
    );
    add(
      produtos.curcuma,
      2,
      "IMC acima da faixa normal",
      "Peso em excesso e dor nas juntas caminham juntos por causa da inflamação. A curcumina atua nessa inflamação e ajuda no conforto para voltar a se movimentar.",
    );
  } else if (p.imc !== null && p.imcMax !== null && !baixoPeso) {
    ler("IMC", "normal", `IMC ${p.imc}, dentro da faixa normal.`);
  }

  if (baixoPeso) {
    ler(
      "Peso",
      "atencao",
      `Seus dados indicam peso abaixo do ideal${
        p.controlePeso !== null && p.controlePeso > 0 ? ` (o aparelho sugere ganhar ${p.controlePeso} kg)` : ""
      }. Por isso não indicamos nada que reduza apetite; o foco é ganhar massa magra com acompanhamento profissional.`,
    );
    add(
      produtos.creatina,
      1,
      "Peso abaixo do ideal: foco em ganhar massa magra",
      "Com peso abaixo do ideal, o ganho precisa vir de músculo, não de gordura. A creatina aumenta o rendimento do treino de força, que é o estímulo que constrói massa magra.",
    );
    add(
      produtos.supraAZ,
      2,
      "Cobrir lacunas de vitaminas e minerais",
      "Peso baixo muitas vezes vem junto de alimentação insuficiente, e aí faltam várias vitaminas ao mesmo tempo. O polivitamínico cobre essas lacunas enquanto a alimentação é ajustada.",
    );
  }

  // BMR: compara o valor medido com o previsto pela equação de Mifflin-St Jeor.
  const previsto = bmrPrevisto(p);
  if (p.bmr !== null && previsto !== null && p.bmr < previsto * 0.9) {
    ler(
      "Metabolismo (BMR)",
      "abaixo",
      `Seu gasto em repouso medido é ${p.bmr} kcal, contra cerca de ${previsto} kcal esperadas para seu peso, altura, idade e sexo. Metabolismo mais baixo normalmente acompanha pouca massa muscular.`,
    );
    add(
      produtos.coq10,
      2,
      `BMR medido (${p.bmr} kcal) abaixo do previsto (~${previsto} kcal)`,
      "O gasto em repouso depende da energia produzida dentro das células. A coenzima Q10 participa diretamente dessa produção nas mitocôndrias, e a produção natural dela cai com a idade e com o uso de estatinas.",
    );
    add(
      produtos.b12,
      3,
      "Suporte ao metabolismo energético",
      "A B12 é necessária para transportar oxigênio no sangue e para o funcionamento dos nervos. Sem ela, o cansaço persiste mesmo dormindo bem — e a falta é comum em quem usa metformina, omeprazol ou come pouca carne.",
    );
  } else if (p.bmr !== null && previsto !== null) {
    ler("Metabolismo (BMR)", "normal", `${p.bmr} kcal medidas, em linha com as ~${previsto} kcal esperadas para seu perfil.`);
  }

  // ---- Recomendações por idade ----
  const idade = p.idade;
  if (idade !== null) {
    if (idade < 30) {
      add(
        produtos.creatina,
        2,
        "18 a 29 anos: melhor fase para construir força e músculo",
        "Nesta faixa a resposta ao treino é a maior da vida, e o músculo construído agora é o que protege articulações e metabolismo nas décadas seguintes. A creatina é o suplemento com mais estudos para acelerar esse ganho.",
        "idade",
      );
      add(
        produtos.hidrasais,
        3,
        "Rotina ativa pede reposição de eletrólitos",
        "Treino, calor e rotina corrida fazem perder sais junto do suor. Repor eletrólitos mantém a água dentro das células e sustenta o rendimento.",
        "idade",
      );
      add(
        p.sexo === "masculino" ? produtos.supraHomem : produtos.supraMulher,
        3,
        "Polivitamínico de manutenção para 18 a 29 anos",
        "Alimentação irregular nessa fase deixa pequenas faltas de várias vitaminas ao mesmo tempo, o que aparece como cansaço. O polivitamínico da fórmula certa para o seu sexo cobre essas lacunas.",
        "idade",
      );
    } else if (idade < 45) {
      add(
        produtos.b12,
        2,
        "30 a 44 anos: energia e metabolismo em rotina intensa",
        "É a faixa de maior carga de trabalho e menor tempo para comer bem. A B12 na forma ativa sustenta a produção das células que levam oxigênio, ponto central do cansaço dessa fase.",
        "idade",
      );
      add(
        produtos.magplusSupra,
        3,
        "A partir dos 30 o magnésio faz diferença no sono e no estresse",
        "O magnésio participa do relaxamento muscular e da regulação do sistema nervoso. Repor ajuda em sono leve, tensão e cãibras — queixas típicas dessa faixa.",
        "idade",
      );
      add(
        p.sexo === "feminino" ? produtos.colagenoHidro : produtos.supraHomem,
        3,
        p.sexo === "feminino"
          ? "A produção de colágeno cai cerca de 1% por ano depois dos 30"
          : "Polivitamínico masculino de manutenção",
        p.sexo === "feminino"
          ? "Depois dos 30 a produção de colágeno diminui gradualmente. Os peptídeos Verisol fornecem aminoácidos usados pela pele, com resultado variável entre pessoas."
          : "Fórmula com zinco e complexo B, ajustada às necessidades masculinas, para energia e imunidade na rotina intensa.",
        "idade",
      );
    } else if (idade < 60) {
      add(
        produtos.calcivitam,
        2,
        "45 a 59 anos: perda óssea natural se acelera",
        "Nessa fase a perda de massa óssea acelera, especialmente nas mulheres após a menopausa. Cálcio com vitaminas D e K é a combinação que o osso realmente aproveita.",
        "idade",
      );
      add(
        produtos.verisol,
        2,
        "Perda de colágeno e de massa magra acelera após os 45",
        "A partir dos 45 a pele perde firmeza e o corpo perde massa magra mais rápido. Os peptídeos Verisol com vitaminas dão suporte estrutural a pele e tecidos de sustentação.",
        "idade",
      );
      add(
        produtos.magplusSupra,
        2,
        "A absorção de magnésio cai com a idade",
        "Com menos magnésio disponível aparecem cãibras, sono picado e tensão muscular. A forma dimalato é bem absorvida e bem tolerada pelo intestino.",
        "idade",
      );
      add(
        produtos.coq10,
        3,
        "A produção natural de coenzima Q10 diminui após os 45",
        "A Q10 é peça da produção de energia dentro das células e protege o coração. A queda natural é maior ainda em quem usa medicação para colesterol.",
        "idade",
      );
    } else {
      add(
        produtos.calcivitam,
        1,
        "60+: prioridade em osso, cálcio e vitamina D",
        "Depois dos 60, osso frágil é o principal risco de uma queda virar fratura. Cálcio com vitaminas D e K é a base da prevenção, junto de treino de força.",
        "idade",
      );
      add(
        produtos.b12,
        1,
        "Depois dos 60 a absorção de B12 cai bastante",
        "O estômago produz menos ácido com a idade, e sem ele a B12 do alimento não é absorvida. A falta aparece como cansaço, esquecimento e formigamento — vale dosar no sangue.",
        "idade",
      );
      add(
        produtos.flexigold,
        2,
        "Desgaste articular é comum a partir dos 60",
        "Anos de carga desgastam a cartilagem, que é feita de colágeno tipo 2. Repor esse tipo específico dá suporte à mobilidade do dia a dia.",
        "idade",
      );
      add(
        produtos.coq10,
        2,
        "Energia celular e saúde do coração após os 60",
        "A produção própria de Q10 já está bem reduzida nessa idade. Repor apoia a energia das células e a proteção antioxidante do coração.",
        "idade",
      );
      add(
        produtos.magplus,
        2,
        "Magnésio para cãibras, sono e força muscular",
        "Cãibras noturnas e sono picado são queixas muito comuns após os 60 e frequentemente ligadas à falta de magnésio, que também participa da contração muscular.",
        "idade",
      );
      add(
        produtos.seniorSupra,
        3,
        "Polivitamínico de manutenção voltado à fase 60+",
        "A fórmula sênior é uma opção mais adequada à faixa de idade do que um polivitamínico adulto genérico. Ainda assim, não substitui alimentação nem exames.",
        "idade",
      );
      add(
        produtos.psylax,
        3,
        "O intestino fica mais lento com a idade",
        "Menos movimento e menos líquido deixam o intestino preso. A fibra do psyllium, tomada com bastante água, devolve regularidade sem irritar o intestino.",
        "idade",
      );
    }

    if (p.sexo === "feminino" && idade >= 50) {
      add(
        produtos.cranberry,
        3,
        "Após a menopausa a infecção urinária de repetição é mais comum",
        "A queda do estrogênio muda a proteção natural da bexiga, e infecções voltam com mais frequência. O cranberry é usado como apoio preventivo — nunca como tratamento de uma infecção ativa.",
        "idade",
      );
    }
  }

  if (lista.length === 0) {
    add(
      p.sexo === "masculino" ? produtos.supraHomem : produtos.supraMulher,
      3,
      "Indicadores dentro da normalidade",
      "Seus dados não mostraram nenhum ponto fora da faixa. Nesse cenário a indicação é de manutenção: um polivitamínico para cobrir as pequenas lacunas da alimentação do dia a dia.",
    );
  }

  const alerta =
    (p.visceral !== null && p.visceral >= 15) || (p.imc !== null && p.imc >= 35)
      ? "Seus dados mostram gordura visceral em nível muito alto ou IMC igual ou acima de 35. Esse cenário aumenta de forma importante o risco de diabetes, pressão alta e doença do coração, e precisa de acompanhamento de médico e nutricionista. As sugestões abaixo são apenas complemento, nunca tratamento."
      : baixoPeso
        ? "Seus dados indicam peso abaixo do ideal. Nesse caso, perda de peso não deve ser o objetivo, e emagrecimento sem explicação precisa de avaliação médica. As sugestões abaixo priorizam ganho de massa magra."
        : null;

  lista.sort((a, b) => a.prioridade - b.prioridade);
  const nomesPrincipais = new Set(lista.slice(0, 6).map((recomendacao) => recomendacao.nome));
  for (const recomendacao of lista) {
    recomendacao.alternativas = alternativasPara(recomendacao, p).filter(
      (alternativa) => alternativa.nome !== recomendacao.nome && !nomesPrincipais.has(alternativa.nome),
    );
  }

  return {
    bloqueadoMenorIdade: false,
    alerta,
    faixaIdade: faixaDeIdade(idade),
    leituras,
    recomendacoes: lista.slice(0, 6),
  };
}

export const camposBasicos = [
  { key: "idade", label: "Idade" },
  { key: "altura", label: "Altura (cm)" },
] as const;

export const camposComFaixa = [
  { key: "peso", min: "pesoMin", max: "pesoMax", label: "Peso (kg)" },
  { key: "agua", min: "aguaMin", max: "aguaMax", label: "Água corporal (kg)" },
  { key: "minerais", min: "mineraisMin", max: "mineraisMax", label: "Minerais (kg)" },
  { key: "musculo", min: "musculoMin", max: "musculoMax", label: "Massa muscular esquelética (kg)" },
  { key: "imc", min: "imcMin", max: "imcMax", label: "IMC" },
  { key: "gorduraPerc", min: "gorduraPercMin", max: "gorduraPercMax", label: "Relação de gordura (%)" },
  { key: "adiposidade", min: "adiposidadeMin", max: "adiposidadeMax", label: "Nível de adiposidade" },
] as const;

export const camposExtras = [
  { key: "proteina", label: "Massa proteica (kg)" },
  { key: "massaGorda", label: "Massa gorda (kg)" },
  { key: "massaLivreGordura", label: "Massa livre de gordura (kg)" },
  { key: "gorduraSubcutanea", label: "Gordura subcutânea (kg)" },
  { key: "idadeCorpo", label: "Idade do corpo" },
  { key: "visceral", label: "Gordura visceral (nível)" },
  { key: "ingestaoCalorica", label: "Ingestão calórica (kcal)" },
  { key: "bmr", label: "BMR (kcal)" },
  { key: "controlePeso", label: "Controle de peso (kg)" },
  { key: "controleGordura", label: "Controle de gordura (kg)" },
  { key: "controleMuscular", label: "Controle muscular (kg)" },
] as const;

export const camposNumericos: (keyof Perfil)[] = Object.keys(perfilVazio).filter(
  (k) => k !== "sexo",
) as (keyof Perfil)[];
