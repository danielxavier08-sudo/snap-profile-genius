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
  beneficios: string[];
};

export const produtos: Record<string, Produto> = {
  spirulina: {
    nome: "Spirulina e Picolinato de Cromo",
    categoria: "Controle de peso / metabolismo",
    beneficios: [
      "Spirulina: alga rica em proteínas, vitaminas e antioxidantes",
      "Picolinato de cromo ajuda a reduzir a vontade de doces",
      "Auxilia no controle do apetite e do peso",
    ],
  },
  curcuma: {
    nome: "Cúrcuma 130mg Curcumin",
    categoria: "Antioxidante / anti-inflamatório",
    beneficios: [
      "Curcumina com ação antioxidante e anti-inflamatória",
      "Auxilia na resposta inflamatória ligada ao excesso de gordura",
      "Apoia a saúde das articulações e do fígado",
    ],
  },
  creatina: {
    nome: "Creatina Monoidratada 300g (100% Pura)",
    categoria: "Performance / força muscular",
    beneficios: [
      "O suplemento mais estudado do mundo para força e massa muscular",
      "Aumenta a energia disponível para os músculos nos treinos",
      "Auxilia na recuperação e na preservação da massa magra",
    ],
  },
  verisol: {
    nome: "Colágeno Verisol + Vitaminas e Minerais",
    categoria: "Suporte estrutural muscular",
    beneficios: [
      "Peptídeos bioativos Verisol com absorção comprovada",
      "Auxilia na firmeza da pele, unhas e cabelos",
      "Com vitaminas e minerais que potencializam a síntese de colágeno",
    ],
  },
  flexigold: {
    nome: "Flexigold Special Pack (Colágeno Tipo 2 + Vitaminas)",
    categoria: "Articulações (uso geral/preventivo)",
    beneficios: [
      "Colágeno tipo 2 para a saúde das cartilagens",
      "Combinação com vitaminas para suporte articular completo",
      "Indicado para prevenção do desgaste das articulações",
    ],
  },
  colageno2: {
    nome: "Colágeno Tipo 2 (30 cáps)",
    categoria: "Articulações (carga alta)",
    beneficios: [
      "Protege as cartilagens sobrecarregadas pelo excesso de peso",
      "Auxilia na mobilidade e no conforto articular",
      "Dose prática: apenas 1 cápsula ao dia",
    ],
  },
  calcivitam: {
    nome: "Calcivitam Flex + Colágeno Tipo II",
    categoria: "Ossos / minerais",
    beneficios: [
      "Cálcio com vitaminas D e K para saúde óssea",
      "Com colágeno tipo II para articulações",
      "Auxilia na reposição de minerais essenciais",
    ],
  },
  magplus: {
    nome: "Mag Plus Dimalato - 60 cáps",
    categoria: "Minerais / eletrólitos",
    beneficios: [
      "Magnésio dimalato de alta absorção",
      "Auxilia na redução de cãibras e fadiga muscular",
      "Contribui para o equilíbrio eletrolítico e a hidratação celular",
    ],
  },
  magplusSupra: {
    nome: "Magnésio Dimalato Supra - 60 cáps",
    categoria: "Minerais / eletrólitos",
    beneficios: [
      "Magnésio dimalato: forma quelada de alta biodisponibilidade",
      "Participa de mais de 300 reações do metabolismo",
      "Auxilia em cãibras, fadiga e qualidade do sono",
    ],
  },
  hidrasais: {
    nome: "Hidrasais Tonic Eletrólitos (4 envelopes)",
    categoria: "Hidratação / reposição eletrolítica",
    beneficios: [
      "Reposição rápida de eletrólitos (sódio, potássio e magnésio)",
      "Auxilia na hidratação corporal e na disposição",
      "Prático: envelope individual para diluir em água",
    ],
  },
  vitcZinco: {
    nome: "Vitamina C e Zinco Immunity",
    categoria: "Imunidade",
    beneficios: [
      "Combinação clássica para o fortalecimento da imunidade",
      "Vitamina C com ação antioxidante",
      "Zinco auxilia no funcionamento do sistema imune",
    ],
  },
  kitSupra: {
    nome: "Kit Vitamina Supra Imunidade (A+C+D+E+Zinco+Selênio)",
    categoria: "Imunidade completa",
    beneficios: [
      "Combinação completa de vitaminas A, C, D e E",
      "Com zinco e selênio, minerais-chave da imunidade",
      "Custo-benefício: proteção completa em um só kit",
    ],
  },
  supraAZ: {
    nome: "Supra AZ Polivitamínico - 60 cáps",
    categoria: "Polivitamínico",
    beneficios: [
      "Vitaminas e minerais de A a Zinco em 1 cápsula ao dia",
      "Complementa a alimentação do dia a dia",
      "Mais energia e disposição para a rotina",
    ],
  },
  supraHomem: {
    nome: "Supra Homem Polivitamínico - 60 cáps",
    categoria: "Polivitamínico",
    beneficios: [
      "Fórmula pensada para as necessidades do homem",
      "Com zinco, que contribui para a manutenção da testosterona",
      "Energia, disposição e suporte à imunidade",
    ],
  },
  supraMulher: {
    nome: "Supra Mulher Polivitamínico - 60 cáps",
    categoria: "Polivitamínico",
    beneficios: [
      "Fórmula pensada para as necessidades da mulher",
      "Com ferro e ácido fólico, importantes no ciclo feminino",
      "Suporte à pele, cabelos, unhas e imunidade",
    ],
  },
  b12: {
    nome: "Vitamina B12 - Metilcobalamina Supra - 60 cáps",
    categoria: "Energia / metabolismo",
    beneficios: [
      "Metilcobalamina: forma ativa e de melhor absorção da B12",
      "Auxilia na redução do cansaço e da fadiga",
      "Importante para o sistema nervoso e a formação do sangue",
    ],
  },
  coq10: {
    nome: "COQ10 - Coenzima Q10 200mg - 30 cáps",
    categoria: "Energia celular",
    beneficios: [
      "Coenzima Q10: essencial para a produção de energia nas células",
      "Potente antioxidante, aliado da saúde do coração",
      "Dose concentrada de 200mg por cápsula",
    ],
  },
  psylax: {
    nome: "Psylax Psyllium (Plantago Ovata) 180g",
    categoria: "Fibras / saúde intestinal",
    beneficios: [
      "Fibra solúvel que aumenta a saciedade entre as refeições",
      "Auxilia no funcionamento regular do intestino",
      "Contribui para o controle do colesterol e da glicemia",
    ],
  },
  serenizz: {
    nome: "Serenizz Melatonina - 60 cáps",
    categoria: "Sono / recuperação metabólica",
    beneficios: [
      "Melatonina: o hormônio natural do sono",
      "Auxilia a pegar no sono mais rápido e dormir melhor",
      "Sono de qualidade favorece a recuperação e o metabolismo",
    ],
  },
  cranberry: {
    nome: "Cranberry 60 cáps",
    categoria: "Saúde intestinal/urinária",
    beneficios: [
      "Tradicional aliado da saúde do trato urinário",
      "Rico em antioxidantes (proantocianidinas)",
      "Auxilia na prevenção de infecções urinárias de repetição",
    ],
  },
  colagenoHidro: {
    nome: "Colágeno Hidrolisado (frutas vermelhas)",
    categoria: "Beleza / pele",
    beneficios: [
      "Colágeno hidrolisado de fácil absorção",
      "Auxilia na elasticidade e hidratação da pele",
      "Sabor frutas vermelhas: fácil de incluir na rotina",
    ],
  },
};

export type Recomendacao = Produto & {
  prioridade: number;
  motivo: string;
  origem: "bioimpedancia" | "idade";
};

export type Resultado = {
  bloqueadoMenorIdade: boolean;
  alerta: string | null;
  faixaIdade: string | null;
  recomendacoes: Recomendacao[];
};

const abaixo = (v: number | null, min: number | null) => v !== null && min !== null && v < min;
const acima = (v: number | null, max: number | null) => v !== null && max !== null && v > max;

export function faixaDeIdade(idade: number | null): string | null {
  if (idade === null) return null;
  if (idade < 30) return "18–29 anos";
  if (idade < 45) return "30–44 anos";
  if (idade < 60) return "45–59 anos";
  return "60+ anos";
}

export function recomendar(p: Perfil): Resultado {
  if (p.idade !== null && p.idade < 18) {
    return { bloqueadoMenorIdade: true, alerta: null, faixaIdade: null, recomendacoes: [] };
  }

  const lista: Recomendacao[] = [];
  const add = (
    produto: Produto,
    prioridade: number,
    motivo: string,
    origem: "bioimpedancia" | "idade" = "bioimpedancia",
  ) => {
    const existente = lista.find((r) => r.nome === produto.nome);
    if (existente) {
      if (prioridade < existente.prioridade) {
        existente.prioridade = prioridade;
        existente.motivo = motivo;
        existente.origem = origem;
      }
      return;
    }
    lista.push({ ...produto, prioridade, motivo, origem });
  };

  // ---- Indicadores da bioimpedância ----
  if (acima(p.gorduraPerc, p.gorduraPercMax) || (p.controleGordura !== null && p.controleGordura < 0)) {
    add(produtos.spirulina, 1, `Relação de gordura ${p.gorduraPerc ?? "-"}% acima da faixa normal ou controle de gordura negativo`);
    add(produtos.curcuma, 2, "Excesso de gordura corporal — suporte anti-inflamatório");
    add(produtos.psylax, 2, "Fibra solúvel que auxilia na saciedade e no controle do peso");
  }

  if (p.visceral !== null && p.visceral > 9) {
    add(produtos.curcuma, 1, `Gordura visceral em nível ${p.visceral} (acima de 9)`);
    add(produtos.spirulina, 1, `Gordura visceral em nível ${p.visceral} (acima de 9)`);
  }

  if (abaixo(p.musculo, p.musculoMin) || (p.controleMuscular !== null && p.controleMuscular > 0)) {
    add(produtos.creatina, 1, "Massa muscular esquelética abaixo da faixa normal ou controle muscular positivo");
    add(produtos.verisol, 2, "Complemento estrutural para ganho de massa muscular");
  }

  if (abaixo(p.minerais, p.mineraisMin)) {
    add(produtos.magplusSupra, 2, `Minerais (${p.minerais} kg) abaixo da faixa normal`);
    add(produtos.calcivitam, 2, `Minerais (${p.minerais} kg) abaixo da faixa normal`);
  }

  if (abaixo(p.agua, p.aguaMin)) {
    add(produtos.hidrasais, 1, `Água corporal total (${p.agua} kg) abaixo da faixa normal — reposição de eletrólitos`);
    add(produtos.magplus, 2, `Água corporal total (${p.agua} kg) abaixo da faixa normal`);
  }

  if (p.idadeCorpo !== null && p.idade !== null && p.idadeCorpo > p.idade + 3) {
    add(produtos.flexigold, 2, `Idade do corpo (${p.idadeCorpo}) maior que a idade real (${p.idade})`);
  }

  if (acima(p.imc, p.imcMax) || acima(p.adiposidade, p.adiposidadeMax)) {
    add(produtos.colageno2, 3, "IMC ou nível de adiposidade em nível alto");
    add(produtos.curcuma, 2, "IMC acima da faixa normal");
    add(produtos.vitcZinco, 3, "Reforço de imunidade com IMC/gordura fora da faixa");
  }

  if (p.bmr !== null && p.ingestaoCalorica !== null && p.bmr < p.ingestaoCalorica * 0.6) {
    add(produtos.coq10, 2, `BMR (${p.bmr} kcal) abaixo do esperado — suporte à energia celular`);
    add(produtos.b12, 3, `BMR (${p.bmr} kcal) abaixo do esperado — suporte ao metabolismo energético`);
    add(produtos.serenizz, 3, `BMR (${p.bmr} kcal) abaixo do esperado para o perfil`);
  }

  // ---- Recomendações por idade ----
  const idade = p.idade;
  if (idade !== null) {
    if (idade < 30) {
      add(produtos.creatina, 2, "Entre 18 e 29 anos: fase de maior ganho de força e massa muscular", "idade");
      add(produtos.hidrasais, 3, "Rotina ativa nessa faixa de idade pede boa hidratação e eletrólitos", "idade");
      add(p.sexo === "masculino" ? produtos.supraHomem : produtos.supraMulher, 3, "Polivitamínico de manutenção para a faixa de 18 a 29 anos", "idade");
    } else if (idade < 45) {
      add(produtos.b12, 2, "Entre 30 e 44 anos: suporte à energia e ao metabolismo na rotina intensa", "idade");
      add(produtos.magplusSupra, 3, "A partir dos 30 o magnésio ajuda no sono, no estresse e nas cãibras", "idade");
      add(p.sexo === "feminino" ? produtos.colagenoHidro : produtos.supraHomem, 3, "A produção de colágeno começa a cair a partir dos 30 anos", "idade");
    } else if (idade < 60) {
      add(produtos.calcivitam, 2, "Entre 45 e 59 anos: perda óssea natural pede cálcio com vitaminas D e K", "idade");
      add(produtos.verisol, 2, "Perda de colágeno e de massa magra acelera nessa faixa de idade", "idade");
      add(produtos.magplusSupra, 2, "Absorção de magnésio cai com a idade — apoio a sono e músculos", "idade");
      add(produtos.coq10, 3, "A partir dos 45 a produção natural de coenzima Q10 diminui", "idade");
      add(p.sexo === "feminino" ? produtos.supraMulher : produtos.supraHomem, 3, "Polivitamínico específico para a faixa de 45 a 59 anos", "idade");
    } else {
      add(produtos.calcivitam, 1, "60+ anos: prioridade em cálcio, vitamina D e saúde óssea", "idade");
      add(produtos.b12, 1, "Depois dos 60 a absorção de vitamina B12 cai bastante", "idade");
      add(produtos.flexigold, 2, "Desgaste articular é comum a partir dos 60 anos", "idade");
      add(produtos.coq10, 2, "Suporte à energia celular e à saúde do coração após os 60", "idade");
      add(produtos.magplus, 2, "Magnésio para cãibras, sono e função muscular na terceira idade", "idade");
      add(produtos.kitSupra, 3, "Imunidade merece atenção extra a partir dos 60 anos", "idade");
      add(produtos.psylax, 3, "Fibras ajudam o intestino, que fica mais lento com a idade", "idade");
    }

    if (p.sexo === "feminino" && idade >= 45) {
      add(produtos.cranberry, 3, "Mulheres a partir dos 45 anos têm mais infecções urinárias de repetição", "idade");
    }
  }

  if (lista.length === 0) {
    add(
      p.sexo === "masculino" ? produtos.supraHomem : produtos.supraMulher,
      3,
      "Todos os indicadores dentro da normalidade — recomendação de manutenção",
    );
  }

  const alerta =
    (p.visceral !== null && p.visceral >= 15) || (p.imc !== null && p.imc >= 35)
      ? "Seus dados indicam gordura visceral ou IMC bastante elevados. Busque orientação de um médico ou nutricionista; as sugestões abaixo servem apenas como complemento."
      : null;

  lista.sort((a, b) => a.prioridade - b.prioridade);

  return {
    bloqueadoMenorIdade: false,
    alerta,
    faixaIdade: faixaDeIdade(idade),
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
