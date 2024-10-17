import { MsgEncoding, GasFeeSpeed } from '@xdefi-tech/chains-core';
import BigNumber from 'bignumber.js';
import * as utils from 'coinselect/utils';

import { ChainMsg } from './msg';

describe('msg', () => {
  let mockProvider: any;

  beforeEach(() => {
    mockProvider = {
      scanUTXOs: jest.fn(() =>
        Promise.resolve([
          {
            hash: 'e08df1abc9c1618ba7fe3c3652c5911263ceb75a95dcee0424e7700ac0e63a6d',
            value: 546,
            index: 0,
            witnessUtxo: {
              value: 546,
              script: Buffer.from(
                '5120315c668cf7eea0e451ffc7f202965d66ad624fc8a2a543754ce4f640e75e4088',
                'hex'
              ),
            },
            txHex:
              '0200000000010173c12c3f6f99438c02abb77a8d782f651a80b7dac30dac74dbd9ea988e2c966b000000000005000000032202000000000000225120315c668cf7eea0e451ffc7f202965d66ad624fc8a2a543754ce4f640e75e40882202000000000000225120315c668cf7eea0e451ffc7f202965d66ad624fc8a2a543754ce4f640e75e40880000000000000000296a5d26020704948db1feb59ec9a6d302010003a40205a9e90706f4f3ccc8010a84f60d08aedf01160103406cb75a669728ffa3529936bd3c37aa8b606442f8a8a5c8cd8c0f2b7774bbffebbc7a770e8789aeb55e0c59540929ba5e837a0ce0b4a7f9bdb3adf61eda2d128bfde62420c69c3c844f045d9a786266588d89b96bfc636c3ff39a9afd3b346784a24c8248ac0063036f72645d099446cc5ff3244d530101010a696d6167652f6a706567004d0802ffd8ffe000104a46494600010100000100010000ffe201d84943435f50524f46494c45000101000001c800000000043000006d6e74725247422058595a2007e00001000100000000000061637370000000000000000000000000000000000000000000000000000000010000f6d6000100000000d32d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000964657363000000f0000000247258595a00000114000000146758595a00000128000000146258595a0000013c00000014777470740000015000000014725452430000016400000028675452430000016400000028625452430000016400000028637072740000018c0000003c6d6c756300000000000000010000000c656e5553000000080000001c007300520047004258595a200000000000006fa2000038f50000039058595a2000000000000062990000b785000018da58595a2000000000000024a000000f840000b6cf58595a20000000000000f6d6000100000000d32d706172610000000000040000000266660000f2a700000d59000013d000000a5b00000000000000006d6c756300000000000000010000000c656e5553000000200000001c0047006f006f0067006c006500200049006e0063002e00200032003000310036ffdb004300191113161310191614161c1b191e253e29252222254d08024c373a2d3e5a505f5e595057566470907a646a886c56577daa7e889499a1a2a16178b0bdaf9cbb909ea19affdb0043011b1c1c252125492929499a6757679a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9affc00011080190019003012200021101031101ffc4001a000002030101000000000000000000000001020003040506ffc40031100002020104010304020201040301000000010203110412213141051351223261711442238133152452a1436291b1ffc4001801010101010100000000000000000000000001020304ffc4001d110101010101000203000000000000000000011102032131121351ffda000c03010002110311003f00f4ec082c08a88064032800279030030308ac2125da232488c0460616294062c7c8cc58f9003030b158400308000bef2322fbc8fb0000200a842100847d108fa00f84144f08888190c844320a643088641523f79615c7ef1c8190401401080801210840b67432e90b3e865d20080200210800200200a0fa129fec3cbed6253f6cbf611d16041022a201858aca0790327923085030b03012406190180ac563314a031579198abb61018ac662b000020002fbc8fb22fbc8c000090281024c0108fa0e08d70407c220d8e82a127d2602850ded4d7f560c35e02a2185414018fde3891fb87228a1854301028014404840804d0802b2185978180012100042100040802927f6b055ff001ffb0d9f6b257ff1a08de04117c9a44606162b081e40c3e40c00c56160602488c92e88c0562b0b032851576c662aed84462b0b000001000abef41605f7a0bec0042070151070443c20e4f0910051c97d5a594fbe11a68d3a8accbb3425826ae29869a11ed65966211f84194e315cbc1cfd5d8fdc8a4f8c915bac4dc7e9c18a745edf48d3fc8ae1149cb90c2edef88bc7c8197d8718e6512bdadfdb1674da4fb2b9cabfb1b49b039e961f2326596685c9e63302d2db1e9a6501048ebb62b9c15bb2517871cfe80b421846528a963046b1d904210202bed0ec47f721d80081200001030214db7c6b59657a8d46de11835176e8bcbe41ae94e6a55e53e19643fe3472347a9ffe393e3c1d78fd8bf406e17c858be4d322c56160602bec0c2fb0300315840c059740f049744f050ac0c2c561018abb633117dcc08c0162b00300401417dc82fb02fbd0584421064829a11727847474f4a8472fb2ad253c6e66c336ac4200119a9671e08acf753dce5997e0c3aa8d925ba4b62f075c4b2a8598dcb2064d0550954a4e3997cb345f29421fe38e59625182c2c2466d5ea556b6c7993032bd6d95a7bfb1689c5d9ee5cf327d234e9f48a5fe4b965bf05b1d1d519ee480ba324e29ae8c7a8d67b77c611e72cbf516a84308e42b211d439cf9c7488aee71249b40db0f847356a355a878aa1b63f2cd7a7d3c4d0802e1f5593729145f34dc71178316a29b13fa1ca4d9ba5251596f063b7d42b83c47ea7f80055a7b92cca48364955f7c9029f518d9628358c974f49558f32cb0332d4425258792f5252e8b614575ac46290fb52f080a085b29417782895d580459bc45915907d305affc6f00726d9393975d98ef928fecdb2508272f2ce5ea64f73fc8642166db33f0cf49a6b1594c5fe0f2a9ee9a47a1f4e97f8b0163b62f9185f2699415858180afb2323ec0c00c56160602cba0780cba17c140606162b080c55f73198abee023158581801802c01417de8205f720804b74f5ef9a4548e9692bdb0dcfb64a2f8c76a490c0c8bbd61fe0cb44d4d9b2b6cc9e9f395964dff5336bf512b6c5543cbc1d1d252a9a6315df903401b1673508e5986cd44ac6d478463bee72d4e75aedb2b6b0e466aeba55bbe52cbf1928785db0271974ce3fbaff001bfc1d54d35c312fb5555b9330d774aa977946e5b6d826d651db9ee7518b31cb957a8d6cf8cc21f26ca3d3a9ab96b74be59ad612e086d012515c2c155fa885316e4c7b149c711786736dd15b65f194a5ba39e500d8bb58f2decabffe86c5469eb6a2937f26f514a1b71c60e73d0bb752d4dbf6d1064d356efd545d69ed4f2d9de5c212aaa15476c22921db51596046d259664bf5497112ad4ea5b784f831b6db28b2774a4f96239314810ca4d16c2dcac3e8ce14c04d6edaea6d238575bba47a1b2b57d4e0ce46a3d3674d080216dc7c15319b4cb36fe8efe87889c5d3552849ee5c9dad27da88b1dc15f622ba2fc87726fb34c998ac3903015f6464976060062b198ac057d03c05f42ae8a2315858184062afb82c55f701181858a00606100505f721855f721bc816d10df624751709230e863f5391b4cd6a24e5b60d9ce7aac426bcb3a125ba2d7c9c2d5c6dd3d92cc5b8f820b7410f7754e72ea2755dcb7a845e59c1a6ed44deda6b6b3e4ec68f4ee986e9bccdf6c109aab374b622b4b0816bff0033c897592ae1951c9e2eeef4efccf867d53df6a845e1f9123374dca2dee40a655bdd2b1fd4cae9fab55c728cbb63a2f0d1ab433dd5b8fc332786d9a3d3d62b949f9676f170edb720534db4998f55abf6e2d47b0e9a5b34dee4df2f967a1c95eaf54e9bb09f7e0d1a6b27647328e0c9a6ad6a2e95f62e17da6eaac536d2f0516900420262d5ea3faa65da9b7643f2ce5592727928129658320204120320c941c9322b960aa76a441a2166d91add944e2d719c1c6f79e4917276396780345d5c37fd25fa6e383049bddde4d14db89e00e8670156c90ad8ad9b61a23a9f92e8db1979303065ae981d06f216608dd28f65d1d4a7d855ec56056465d30b640ac0ba0be80ba280c56331584017fb045fec01628581801808c01517dc86f222fb90ebb03a1a458af3f25f92aabe9aa286c986e1b22ca3197dc93036619eb97f2e3545f606f8c231fb6290d911481296136065d641c64d08027bd74fb2adca50c32fa7511be5283f057768e49b954ffd1c3d3cb6ec6f9eb142d356db720c615d5d6113dbd42e360d0d15b63cd92dabe1189e5d5fb6afa1773ba4abad7ed9be58a28c2f0834d30a6388aff61b62a75b8bf277e799ccc62dd72945ea6fdbbb08bb572db1869eb79c981d93d2ea5a5e0346a947512b6ce5f8352336eba52be3455ed2e1a41f4b939c2527e59cabb532d4db8ae2db7f076b454fb34462fbf248b71ab246f0b22e4ab5366c81463d5dbba6666194b2c52b2806f0430ebb56ab4d45f205d76aa30e114ad665f839129d96cb2d8d084d72993e475ddfb97057df666a9cd782dcbf2ca2d585fa1a6d61246795bc3427b9f909ad1bb816163f73250e5263c7828efb606c2d342b34c8303234236d00722b264990229ca3d32c8eaa4bb2a62b036475319164649aece630ab651f2074db1598e1abf92f8df197902c62ff006265307f600b1585818500108005f721e1ccd7ecad7dc8b2bff917ec0e9671140dc2cd9cff0051b6d843307c7932d0fa8fa82aa2e15be7c9cad1fb93d6466d3c67b134f5bd46a3eb7c1d0d4b8d1186de30565d68be017cb14c9fe0a68b5595c64bc83552ff0004bf465a7234dabf675dcbe1bc33d14649a4d1e4e153b2c9c9768edfa66a5cead927f544b52574721c95e4a6dbfda9addf6b32d35364c95a9a92ca7c072071bd6310b94be515687d3e7aa7bec6e3037ebb4af51a8aff00f15d9bab4d08028a845462b090094696aa12508acfc9a322648df2032661d6599960d9396d83672ed96e9365080211bc22a33eaee5554df93816d8ecb1b9335fa9dee766d4f846022569834916c2493e4c6a4d054a4351b9dc93e1892b72ccf5c5ce49367568d15718a6d65856385765afe94f068fe2b843749e59be3151584b055a97f41462dbd0e911f482823d0ca257289a1a1251348ccd31597ca25528815311b2c684920132d11cc8d08c02e42b680c56c02d032d790360c816475138f92faf549c96e31b140eb2b232e98727254e51e996c35525d81d0014435319765aa69f4c28ff0064595736afd957f643c5e26981bad78667b529c5c5f92eb1e5265126655c696ed36a963ac9b75aa365196f9c075747b8e325e195eaeb94aa4d3e8a83e95737175bf06bd54bfc3239de9916a5293375ff0055524be08ae4c6f74a9a5db068f532ab50a4f84d829a95ba9db3e8dbaed2c7da52ad7da5475e162945497933ebf9a73f065f4abe53a5c65fd4d1ab79a244699b49acf6a4a329662ceac66a4b299e56726ac3a1a1d63862327f48c495dcc872530b14e29a791f2468f9027c8ad922c817552c57839edf269d5cf32c194b12a14eaa7b296cb4c1ea93db560a38d6cb7cdb148432c8a19010c88b17e9966c476e2b114727430cda8ec1795a067d53e123418f532cd98f8348adf80a03ed05151e9da15a26e264046238a2d62328a6502a944d2d0928a60657124d0802b944d52acaa5008ccc565f281538fc008c51dfe50aff0000281b0b15811832460026468db28f4c4201aaad572b71aa17c64f8672c89b4f8607a48b53a13453207a6665a56db1a688d13224929269f449bc26cc5fcb71b1a97411aa3055f11e876f2858cd4e394c2073b55074dcac8f593a1558ada93ed342db5ab20e2ccda572a6c754baf006caeb8d49a82c6497bcd32264aef962a64572e9829ea5a7d0d7552a67ff00d41a67ff0074d9aefb6bdae326544d1eabdb6a2dfd2ceac66a4b299e6e3349bc7fa37e8354e2d5737df44ab2baf919329521f77046996f966c65434de64c52a21c9f5697291d5393ea9f7128e6910d80a46530121e288a2595c32d222b7fa7d7fd8de53a686cad171d27d25093c26609bccdb35dd2c4198fc952a3ec281e4207a4c0ad8ed0ad00bb8192342b282d8ac8c1900362319a1580ad265728a1d8ac0a6512a957f0687111a682333525d8bc334b4995cab4c0a8563ca0d74267e40001b0068001402ca20a76c62de32c0ee7a7476e917e46b3b2eaab55d2a2bc22ab08d289ae0e3df0ff00b8dbf2ced35c1ccd7476dd097e422bae73d359b65f6b3a316a4b28cfaaad59467ce05d058e55ed7dc40d45538c6525cfd48b59ced64e55dca4981bfc156a64954c6a6c56d6a48328a92c340719b719371ec318b9bcce783a1668e12e57052f40fc480a272aa10c43bf92aabdcb2d5b3e7b35c7d3d67ea91aaaa6152c4d08024501aaa6d4127d96eefa599e2c772fa591a54df200900073bd4619e4e899f555ee8e45238db02a25f2af0c8a073554a26cd2519965a169a5ca5d1d1ae0a11c235214dd2004593c47269967d44b2f051e469bdd26c0bb2a07f608176103d2e40492c742eec011a11a1f22b0118ac768460462b23606ca00ad07206c05680d058ac047115c4b00c0a5a12514cbda12480ceeb6ba11e5768d0c56979028e18f571647f6175af01a6b94ad8c719e423bd559f425f803e64595d2a314bf03ed8a32d2971e0e7fa957fe3ddf0ce94e5f066d457ee552451447ead3afd18f41c5d62f06e8c5c74f87f067d1d4d39c9aed846939bea189347466f645c9f8306a946d82b23f3c809a79bd3d8a32fb65d1d1ed64cfecc2eae0fe0bd2c2480842331eab52e0f117c81ac055a7bd5b0cf92d00a0c9fd2281be0299744645d108001acac0400669e9f2f80474cf3c9a88322e961050584824204428be7c6116ce5b6393249ee7965429104010176102182bd33457288d92640a649a177fc97b49954eb026531588e328be08a7f204944469a2dca60682a8602d947256e2d042e40c2d31594462e4206006c56168802342b896030056d1abd3d62dddf05383a3a2ae2aacf9641ad58db239678028e3a0a87964695bc08dc53c6792bd4ea614f09e647396a25fc88c9bf254751c73c0bb141705d0e629a16688acf38ee4d3395a98ca8dd15f6c8ec48a3514ab60d7924d0802a551a38eda23c9795e9a2e356d7e0b1a08ab51271adb47266e53cc9f475ec9c57d32f264d6462a95b5700acb56fa36d8bed7d9d3aac8d914d328a20a7a64a4369ea8d59519640bd8af81857ca01a0f231545e196f614084210021080403692cb03692cb33d966ee174540b67b9fe0ac20020020f0044102e8207a462b43315b0064391583214cd26552afe0b33920199a7122b3e4d0d26553ab3d00bb93232b94651029fc80cd0ad0d94c0d015b88ad16b42b40540658e223400158c4c00b93a7a04dd7ca30575ef9a47629828414578018cdafd47b34bc76cd671fd4db95d187e48566af4d65d177d8de3c14c9e64d25d1d9bd2ab478fc18b4f4674b658d77d031b3416ab34ebf1c16dd2d9072660f4697d5387e4e8ea239aa4bf015ca77ceed4c229e164dfb70b2ce66997fdec51d69c5b612284b2c9b4a5ddb355b1f4cd897007375953972bb461729c96c933b16637f261d751b56f82eca9544b50aaa9422f9268bdc94dcdfdac5d3e91cdeeb3af837a4a2b096101059cb6c5b7e066caece60d7e00aa1a9ae4fbc33442c4fc9c39adb37fb0c2e9c3a9309aefe7203955eba71ecbe3ae52c05d6e2b9d8a250edddd315b069a737210200200800211f4403e802ba080807a7922b68b58ad0554c563b030a40e43815ac10364991724c805a4fb299d39e8b721c818dc1c58548d4d27d95ce8cf405592342ca1288373403342b59194930e32052e4d080220c60b9a028e59516e8229d9ba5d23a4a51f08a74ba751865f6cd2a2978228672ba39b2d2cb51abdef88c59d5c70578c74073bd433270aa3e4b2e8c68d1ed5f05ea85ef3b25cbf063f54def6d70fec066f478376d93f075e714ab6d89a1d32a288c7cf92cb16e963c203894f1af5fb3ab6bdb16ce5db886bd3fc9a75baa5186c8733611ce9b94f5694565e4ed3fa2b4dfc1468748a987bb6733916d8f772f88a030d92f71c9478687a26adab9ed760d4c7daba16c7ed7c32b9c9696f73fe935902d924bf02b8e4aa2e7a99ee7f4d6bff0066b5158e0a3334556bdb06d9ae5030fa84e30a9c73cb0572a6d3931700264303864ce019200f1b651e9974354ffb1948074637465e47c9cb4dae996c2f947c85d6e219e1a94fb2e538be9853019324f2802420023d53158729803449213058c52291a17234858813b26084c900c0484c8540809900b8a7da2a9d3f05a9840c528342a6d1bdc14bb4553a3e02288cf3d9a74f5ef967c22baf4d29cb18e0e9554aae292283143f5d852c1cef51d54ab7b60c0dd2b12f226f8fca38b0b751645c926e3f22a76dd62ae326b230d776328cba6981d3194d4dacb42e974d1d3c3196df96cb9c92e88a1d26571e7233cb5d020b00707d41ecd53f2fc1afd3f45272f7aeedf499b25a2ae7a8f764b2d78352492e0a98a650c955d56ea6515f0689760c115c37a84a995324dcd3e0cee2e75395b2c38f499a7599d34d08026b1b8c5373e83fc7d91f7751f549f5145649a68d9a94b9db05e0e8a82492326854d4e4f6ed83e91b58228be71aab729748f37a9b5db6ca59e33c1e83d431fc7793813ad3e844aa41819c1a172564081e18180039010024010023464d74c52017c2f6bb2e85d16d18c280df94c2628ce4bc96c6ff0090af5f28e3a1777c9632b920d0f62b0731fd054932283592bc619601ac9023401bf62b414039200020c81b2240326326563440b132cae0e4c5aab737c1b210dab080918a8f43a0602f091424e584d9c4d4e6fd4ed8f6d9d0d6ea125b73839f5dce36b95507297c84ae9c288d5a6d98f07213f67591978c9a6766baceabc154745a9bad4ec585908eca7ba29ae8997e10610db051f8433c4511a235260e1719e4ab53ab8d4b19e4cbe9f39df74ec93e17411bc8df01c2c825c20acf3b36e5bf0535eba1396de983d46ab275e6acfe51cb8ca507b651daff0025474f5347bf64271e70cd0ea8c92dcb3839f45ceb5972e0d3a7d6abdb8a5ca20b5c527842343b030397ead638c631f9397d9d0f5479b52f839ee3f06a334ad0928263f28994c233cab6ba13aecd4d092826114107957f0234d010842600898720200c9845200e402201ee642b19b1701b2b42389630322abdcd764c85a11ac7403000a5f212283401b04c0084636dc964689cbc01528b7d1a2ad3b7ccb82faa8505cf65a9002294561218980b692e4a214ea5c956da195f5b96d54d08022cbfc0ed26b0c838b450f577bdf9dabb3ad5d35d4928c520d74c2aced58c8de42606321c2416d4518afd66d6e3545ca5f80ad739a8acc9e0c3a8d6c79507929746ab54f364b647e0c7abaa3a77b62db654d259beedf672d23abe995fb7a64fcb0e874915a4519ae65cb35c62a11515d204888136a2b2f84577ea214ae797e118adf72ffaad96c87c106c85b1b73b1a7812ed2d76a7be2b261a6f7a5b36ec7b24f8674d4b74535e40e45de9962962a9fd2fe4d9a7d3474f5e177e59a642f20c56d15df6c69adca45ed7c9c4f51d43b2c705f6a2c2b2ea2d76d8e4ca9858ad958462b8a091808d340c8ec0d00b8c8ae2361ae899f902a956238b468038e40a3211e55a623835d0406884cb5d87298002898f807441eeda14715a2ba15802d6004018af91b90a837d202a71156e4fac97fb72ce305d553b565f6419e309359c32c85327df0694864155c298c79c64b17e021e8a06191c94565b16c9ed59671f5baa9cbe983c111d1b75908a7b5e59ccb355a9d4cdc60b0be4d157a6eea549cdee6b253669eea33c657ca28be8b74fa387d73dd63ecb3fea2ec96da6b726fc9874fec2966c8e5fe4ead16d18fa3080babddb16fec62bb7515d6b2da31ffd495967b75472c8adf28a92c302ae11ea2835eedab7761602b59470e71f7fd4943c27c9dd7d1929d2ecd54ed7e7a095a63c24bc11f4335c093e23c85732c78d62c45cfe5fc0daf59846717d3e4d080286babb2c4f1f444cf0c5b54a119622bb6ca8d32846fd227e522686d7656e2fb8f0668dbedd5ecd199c9f9346834f3a54a537cc88366d5e43c0867d66a3d9abf2fa0a4d76b6342db15991c1b1ee9397c96db395927293c94b34c52303c0cc46101832162b604c90010211a2100571f827ec626005234468996bb015c532b957f05fc32600cdca0e4b9c531255fc01ee18065063a8608daa717f018d2e5df05c90c022ae2ba4324904204e119eed5420f1db06aed75c784ccba49d6ecff22cc98127adb3394b0890d7cd3fad706f95709470e28e6eaaa554b8e883a14ea6bb57d3dfc1764e251292d44147cb3b4e4a2b2d814eae129d2f67670ec4f389a69a3d146c84ba6812a6b9fdd14c0e2d7ea16d71518c5c8d354f5ba8feaa11fc9bfd9aa0b2a0bffc33df75dd555b0127a084a3f5cbebf9462b23fc56f36292f05ae9d75af97b51755e951ceeba4e4ca39896a35b628c13dbf276b45a186963f33f2cd15d50aa388452409dd1876c18b1f08495905dc91ced5fa8c62b6c5e5fe0c75d3abd53dcb318fe41aed7bd5ffe488adadbe248e5bf4abf1ff2bc95bd35f43fade57c90771493e98b2e4e3e8f5535aaf6a4f299d60a1626eb925de0e651e9d3949bba6d473f6a3aa408a6ba2ba96211487612632148da4b2ce2fa85deedb85d237ebf50a11708be4e44b9658cd56c4658d15cb82a118ac66c46c00c56303010a40e018020024021004c804d0802c4064214ad132d0c00889a64c130898680f7606d2ec2ce76b2738cb12ca5f246db5dd05dc903f915ff00e48e3ef7f23e9e89ea1bfaf007595f5ffe48656c1ff64731fa7d8bff0090aaca2dafab1303aedd72586d3114298bca514ce4a94d773ffd93dc94b88ee93fc10752dd4c20bbcbf84736fbfdd965f0be07ab477db872fa62742ad1d55afb537f2c0e4d76284d4d768d73d74671c49726e7a6a9f7045362d253f728a031e97ddb3529c13505db3b067d35f5dbc54b8f92e95918f6d20198089a6b2881493ba10fba4914d9afaa0bbc8da8d342e8f3dfc9c8d568ada5b78dd002cbbd5a7649c698b7fa161a4d66af99bf6e3ffb269357553c3ad67f46a9fab5504545ba6f4ba69faa599cbe59b7e98af091c897ace78841b2b7abd55fc42b7c81d4b7555d69b72472355ea2ef93855172fd16c3d3aebda7a89617c237d1a4a74eb108acfc81ccf4dd1ddfc8f7ae8ed5e0ece0242001c7c8322cde136c2a4e7082cc9e0c96fa85714d439655a8dd73c748a1e8fca65466b66e72727db2a66c5461fd45b1a61f03531cdd927e09ec4df83a9edc7e01b57c0d5c733f8ad93f8874f6a15c5134c737f8d815d183a4e057280d31ce748aeb37cab2b95634c617011c59b65588eb2ea632601834bac57584c5180e0b3603683084c0db49801704e82403dcf0c16571b23892c9c9af573aa6b2f397d1d783dd14fe434e4ea348ea93c7dbe0a6bba34bdd4d0802b9e7e11d9d4d1ef57b738fc9569fd3e9a796b74be581cf52d66a9ff8e0e31f965f5fa6592e6eb5fe91d3584b826418c95fa7d10ed67f65f1aab87db148cfaefe425ba8e7f072e7ea37d7c5b09203bce515db48a6dd5d14accec4709eb15ef129b8861ecc732c6f7f909adf77a94eefa74d5c9fe7064fe3fd5ee6b2d4bffae46adea2f588b8d50fc05c74da7799b76cc06fe5dae1b34956d8afeccc754adb75295d6f09f3c9aa76df7c76d55ec88b57a7d517bb516fd4fc2606f9fa9e9a88a8464e6d7845ba4d5bd4e5fb728af962d3a2d3d6938c17ed8f6df1ae3f4e08ad00693586b263d1eafdeb6507e3a370573b57e990b732afe991c8ba89d3625756f8f3e0f4e2d90858b128a61183453d3591588c6323a30504be9c7fa31bd0539ca58fd1755546a5c37fec0b5b001e456d2f214f912cb6105f5345374f10789726451cf3279606afe527d4595cee94caf0400e4391499206c2624a0d73161c872057bf1c496187298ed292e515b835f680702b06f6bb19480515ac8ed030054d0ad17342b4052e223822f68180333ac4759a9c45680c8e02b81adc05712a32380bb4d4e02ca0066700389a3681c018e868ea87b8a77cf2d748edc3534f0948e1dda2b2a7f4da98162b5f54f2fe1151e83dfadff6424f53541665348e3570d45dc551718fcb36d1e9915895f2737f015b2ad446d7f426d7c96b7859627d35c7092491835fad8c20d2606eae4d0802d8599daf3825945762c4e099cdf4472929cde70d9d6039b7fa3d16731fa5fe0c36fa3ea21ff14f28f400063cc7f175f5ff0046d0631d627c50f3f93d3315b434c70ead2ebed7f5cb623769fd3a35b52b24e72fc9b5b4bc8ae71f944064be9c238774ef86a1c2516e2df675add5d5545b725c1cad46b2cd54b6d316ff00252a42f85366e4f123a7a7d7d762c37867265e937ce1bf7fd5f057fc1d6c5e12ff006136bd04b5354565cd06abebb93d924f0712af4bbe6d7bd6348eae9b4f0d3436c17ed8569e08e508acb69154e6a2b2ce65d2b2fb3b6a2456ad66bb6fd14f2fe51853be6f32932eaea8c39c658ef0c0a949e30d8ca60944ada6882f520e4a14daec65302d20aa41c80724c818006c9322649901a493ecadc1ae87c933928ad4f9c3e18d92349f6238b5d1038188a787c8ca404c0ad0dd930056c181da15a017006b2311a02b71034580c014b8a06d2d685710374349a8d43fabe889b68f4fa6ae64b74be59ae52515c944f5318a7c9a45f88c170924536ea6104f9e4e6ea3d424f2a2b839d2b751a9b364385f2135bb55ea71cb49e5fc228d368aed6d8a76271aff0026ad17a6d14e277c94a6747f914c16135fe818b29aa14d6a1058487c9927afae252fd453eb045d74720728fca3936fa86173230ddea6fa865b29af4994fa667be894f984dc59c5d35bea16b5edc70bf276f4fef282f79a6ff043ed86cd36b33c58994cb47ae97f4de601748ec932531c9abd21b79bec72fc1d0a74f5d2b108a45e290c4007a16538c565b0a866bb50e13c2e8965ee4f0b8452f9ec02e6e7ce720c95b8b8f310a9a7c3e190381832100640d2630ad63a01250f82be51767e40d26056a43a90ae256d3405ea436e33a9e3b194c0b593257b83901899154839019320bfa26402e29f656e2d743e43902a53f9e06520ca29a2b706b9881670c8d15a9f87c0ea5900340686230101819a000018180074fd4e73ae9cc4e34b5c92c48f4938c671c496518adf4ad358f2e383496388f555bf245ab843edc9d75e8da65e19743d2f4b0fe886a63852d7592fb2126476eb2d58856d7fa3bce3a4a78c472517eb2b82c4120638f0d36aac97f91b8a2cb1c34f1c7dd21eed5d97cfdba565bf83668fd2bab350f74be018e753a4d46b65c27187c9d8d2fa553424e4b74bf26e8c230588ac20917023151584b012102800aefbd54b9163a984967a02edd8335fac8c3e98f3212cd43926919b6f3902e77ce6b97815c9bed8a422a64391591301f22ca2990990133287e50f1929741ec470f2b8610d90e4ad4da7890df94016b22b580e420201a4c66b22b4d015ca22f28b72069302bc87711c4502c4c2995e49b80bb242b520e407c93a172100833861c1000d27da15c1afb4668802a97c872169315a6ba283d81a026300001001ffd96821c0c69c3c844f045d9a786266588d89b96bfc636c3ff39a9afd3b346784a24c824800000000',
          },
        ])
      ),
      getNFTBalance: jest.fn(() =>
        Promise.resolve([
          {
            description: null,
            id: '20090103/e08df1abc9c1618ba7fe3c3652c5911263ceb75a95dcee0424e7700ac0e63a6di0',
            name: 'Inscription #70316307',
            owner:
              'bc1px9wxdr8ha6swg50lcleq99jav6kkyn7g52j5xa2vunmype67gzyqyq6ah7',
            symbol: '',
            isNftSpam: false,
            location:
              'e08df1abc9c1618ba7fe3c3652c5911263ceb75a95dcee0424e7700ac0e63a6d:0:0',
            contractType: 'ORDINALS',
            spamScore: 0,
          },
        ])
      ),
      getBalance: jest.fn(() =>
        Promise.resolve({
          getData: jest.fn(() =>
            Promise.resolve([
              {
                asset: {
                  chainId: 'litecoin',
                  name: 'Litecoin',
                  symbol: 'LTC',
                  icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/litecoin/info/logo.png',
                  native: true,
                  id: 'f164fe78-afb4-4eeb-b5c7-bca104857cda',
                  price: '443.21',
                  decimals: 8,
                },
                amount: '1000',
              },
            ])
          ),
        })
      ),
      gasFeeOptions: jest.fn(() =>
        Promise.resolve({
          high: 5500,
          low: 550,
          medium: 1100,
        })
      ),
      manifest: {
        name: 'Litecoin',
        description: '',
        rpcURL: 'https://blockstream.info',
        chainSymbol: 'LTC',
        blockExplorerURL: 'https://blockchair.com/litecoin',
        chainId: 'litecoin',
        chain: 'litecoin',
        decimals: 8,
        feeGasStep: {
          high: 1,
          medium: 1,
          low: 1,
        },
        maxGapAmount: 0.0001,
      },
    };
  });

  it('buildTx with insufficient balance should throw an error', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: 1001,
      },
      mockProvider,
      MsgEncoding.object
    );

    await expect(chainMsg.buildTx()).rejects.toThrowError();
  });

  jest.setTimeout(30000);

  it('buildTx with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.buildTx();
    expect(response.from).toBe('ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5');
    expect(response.to).toBe('ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5');
    expect(response).toHaveProperty('inputs');
    expect(response).toHaveProperty('outputs');
    expect(response).toHaveProperty('utxos');
  });

  it('getFee should return fee estimation', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getFee();
    const feeOptions = await mockProvider.gasFeeOptions();

    expect(response.fee).toEqual(
      new BigNumber(feeOptions[GasFeeSpeed.medium] as number)
        .dividedBy(10 ** mockProvider.manifest.decimals)

        .toString()
    );
    expect(response.maxFee).toBeNull();
  });

  it('should return MaxAmountToSend with native token', async () => {
    const chainMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: 0.000001,
      },
      mockProvider,
      MsgEncoding.object
    );

    const response = await chainMsg.getMaxAmountToSend();

    const feeEstimation = await chainMsg.getFee();
    const gap = chainMsg.provider.manifest?.maxGapAmount || 0;
    const newMsg = new ChainMsg(
      {
        from: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        to: 'ltc1qt33t2l2fa2t0plm2s3euxvewc079q89ytyjxt5',
        amount: response,
      },
      mockProvider,
      MsgEncoding.object
    );

    const { inputs, outputs } = await newMsg.buildTx();
    const txSize = utils.transactionBytes(inputs, outputs);
    expect(txSize).toEqual(119);
    expect(response).toEqual('0.00000308'); // (546 - 2 * txSize) / 10^8
  });
});
