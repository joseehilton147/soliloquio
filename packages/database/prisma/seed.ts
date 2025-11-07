import { PrismaClient } from '../node_modules/.prisma/client/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Semeando dados espirituais...');

  // Limpar dados existentes
  await prisma.readingType.deleteMany();
  await prisma.tarotCard.deleteMany();

  // Criar carta "O Mago"
  const oMago = await prisma.tarotCard.create({
    data: {
      name: 'O Mago',
      summary:
        'O Mago tem o poder dos quatro elementos: terra, ar, fogo e água, combinado com sua conexão ao divino. Ele pode criar abundância ilimitada no reino físico.',
      description:
        'Agora que o Louco deu o salto para o desconhecido, ele encontra o Mago e aprende que o poder do universo está dentro dele para criar sua própria realidade! Uma figura usando um manto está em pé, com uma varinha em uma de suas mãos apontada para o céu, e a outra mão apontada para o chão. O símbolo do infinito e a postura corporal representam a conexão do Mago com os reinos espiritual e fisico. Sobre a mesa estão os itens que representam os quatro naipes elementais: uma varinha (Paus,fogo), um pentáculo (Ouros, terra), uma espada (Espadas,ar) e uma taça (Copas, água). Esse era o conteúdo da trouxa do Louco! Utilizando os poderes dos elementos e a ajuda do divino, o Mago serve de condutor, com o poder de dar forma ao que não tem forma, transformando intenções em ações para alcançar resultados fisicos.',
      imageUrl: '/images/cartas/o-mago.jpg',
      verticalMeaning: ['Manifestação', 'Criação', 'Ação inspirada'],
      invertedMeaning: ['Desconexão com o poder pessoal', 'Manipulação'],
      numerology: '1',
      astrology: 'Mercúrio',
      typesOfReading: {
        create: [
          {
            type: 'general',
            read: 'Você é o Mago, e os ingredientes de que precisa para ser criativo estão ao seu alcance! Com intenção clara e paixão, você pode se conectar ao divino e transformar seus sonhos em realidade. Esta carta é um lembrete de que você é mais poderoso do que imagina. Aja quando inspirado, e concentre-se em manter cada elemento em equilíbrio na sua vida. Quando você trabalha para manifestar seus sonhos e desejos, você cria o mundo.',
          },
          {
            type: 'love-relationship',
            read: 'Quando o Mago aparece em uma leitura sobre relacionamentos, ele pode significar a manifestação de um relacionamento maravilhoso, ou o reacender da chama de um relacionamento existente. Você tem tudo dentro de si para criar o relacionamento dos seus sonhos, independente do status do seu relacionamento atual. Preste atenção para equilibrar suas emoções (água) com seus pensamentos (ar) enquanto permanece com os pés no chão (terra) e apaixonado (fogo).',
          },
          {
            type: 'career-money',
            read: 'Você pode criar novas oportunidades, usando todas as suas habilidades inerentes para cultivar abundância, manifestar prosperidade e agir para realizar seus objetivos. Se você quer começar o seu próprio negócio, agora é a hora. Reconheça o seu valor quando negociar um aumento ou um contrato.',
          },
          {
            type: 'personal-spiritual',
            read: 'Você está sentindo confortável com o próprio poder ao trabalhar com a natureza e o espírito. Tirar esta carta significa um aprofundamento da sua prática espiritual, e a cocriação da sua realidade com o universo/divino.',
          },
          {
            type: 'inverted',
            read: 'O Mago invertido pode apontar para um mau uso de poder, manipulação ou a tentativa de forçar uma situação. Você pode estar duvidando de sua capacidade de criar e manifestar, ou experimentando um possível bloqueio da sua conexão com um aspecto importante de sua identidade. Este é um momento para reconectar-se à fonte de energia dentro de você. Acredite que, se a porta não estiver abrindo, pode haver uma porta melhor em outro lugar... ou outra maneira de entrar. Se você estiver se sentindo bloqueado, redirecione suas energias.',
          },
        ],
      },
    },
    include: {
      typesOfReading: true,
    },
  });

  console.log('✨ Carta criada:', oMago.name);
  console.log(`📖 Com ${oMago.typesOfReading.length} tipos de leitura`);
  console.log('🎴 Banco de dados pronto para jornada espiritual!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao semear dados:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
