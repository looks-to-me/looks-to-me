import * as styles from './page.css';

import type { PageProps } from '../../_types/page-props';
import type { FC } from 'react';

export const runtime = 'edge';

export type TermsOfUsePageProps = PageProps<{
  params: {
    // empty
  };
  searchParams: {
    // empty
  };
}>;

const TermsOfUsePage: FC<TermsOfUsePageProps> = () => {
  return (
    <article className={styles.article}>
      <p>
        本利用規約（以下「本規約」といいます。）は、本ウェブサイト上で提供するサービス「LooksToMe」（名称を変更する場合には名称変更後のサービスを含め、以下「本サービス」といいます。）の利用条件を定めるものです。本サービスのユーザー（以下「利用者」といいます。）は、本規約に同意したうえで、本サービスをご利用いただきます。
      </p>
      <h2 className={styles.title}>
        第1条（規約の適用）
      </h2>
      <p>
        本規約は、本サービスの提供条件及び運営者と利用者との間の権利義務関係を定めることを目的とし、利用者と運営者との間のサービスの利用に関わる一切の関係に適用されるものとします。
      </p>
      <h2 className={styles.title}>
        第2条（利用資格）
      </h2>
      <ol>
        <li>
          本サービスは以下の条件をすべて満たす方に限り、ご利用いただくことができます。
        </li>
        <ol>
          <li>
            インターネット接続環境を自己の責任と負担で用意できる方
          </li>
          <li>
            本規約に同意かつ遵守できる方
          </li>
          <li>
            契約締結について法的な責任能力のある方
          </li>
          <li>
            過去に本規約に違反したことのない方
          </li>
        </ol>
        <li>
          利用者は、自己の責任において本サービスを利用するものとし、本サービスを利用してなされた一切の行為およびその結果について一切の責任を負うものとします。
        </li>
      </ol>
      <h2 className={styles.title}>
        第3条（認証情報の管理）
      </h2>
      <ol>
        <li>
          利用者は、本サービスのアカウント登録にあたって登録するログインID、パスワードその他の認証情報（以下「認証情報」といい、本サービスと連携する運営者以外の者が運営するサービスの認証情報を含みます。）を、自己の責任において適切に管理および保管するものとします。利用者は、いかなる場合にも、認証情報の使用権限を第三者に譲渡または貸与することはできません。
        </li>
        <li>
          利用者が本サービスのアカウント登録にあたって認証情報として利用する、運営者以外の者が運営するサービス（以下「外部サービス」といいます。）の登録、利用については、当該外部サービスが規定する各規約の定めに従い利用者自身の責任で行うものとします。
        </li>
        <li>
          認証情報の管理不十分、第三者の使用等によって生じた損害または不利益に関する責任は利用者が負うものとし、運営者は一切の責任を負いません。
        </li>
      </ol>
      <h2 className={styles.title}>
        第4条（禁止事項）
      </h2>
      <ol>
        <li>
          利用者は、他の利用者および当社への迷惑・損害やそのおそれを発生させる行為を行わないで下さい。以下特に気をつけていただきたい事項としてその一例を列挙いたしますが、これらに限りません。
        </li>
        <ol>
          <li>
            法令または公序良俗に違反する行為
          </li>
          <li>
            犯罪行為に関連する行為
          </li>
          <li>
            運営者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
          </li>
          <li>
            本サービスの運営を妨害する行為、または妨害するおそれのある行為
          </li>
          <li>
            他者の個人情報等を収集または蓄積する行為
          </li>
          <li>
            他者に成りすます行為
          </li>
          <li>
            反社会的勢力に対して直接的または間接的に利益を供与する行為
          </li>
          <li>
            本サービスの利用者および運営者、第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
          </li>
          <li>
            スパムとみなされる行為（機械により自動生成された文章の投稿や同一内容の文章を繰り返し投稿する行為など）
          </li>
          <li>
            過度に暴力的な表現、露骨な性的表現、人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現、自殺、自傷行為、薬物乱用を誘引または助長する表現、他人に不快感を与える表現等、不適切な内容を投稿する行為、他者に対する嫌がらせや誹謗中傷する行為
          </li>
          <li>
            その他、運営者が不適切と判断する行為
          </li>
        </ol>
        <li>
          前項のいずれかの行為が発覚した場合、当該コンテンツの削除、あるいはその利用者のアカウントを停止・削除する場合があります。
        </li>
      </ol>
      <h2 className={styles.title}>
        第5条（本サービスの提供の停止等）
      </h2>
      <ol>
        <li>
          運営者は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
        </li>
        <ol>
          <li>
            本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
          </li>
          <li>
            地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
          </li>
          <li>
            コンピュータまたは通信回線等が事故により停止した場合
          </li>
          <li>
            本サービスが利用しているクラウドサービスが停止した場合
          </li>
          <li>
            その他、運営者が本サービスの提供が困難と判断した場合
          </li>
        </ol>
        <li>
          運営者は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる損害または不利益について、理由を問わず一切の責任を負わないものとします。
        </li>
      </ol>
      <h2 className={styles.title}>
        第6条（著作権等）
      </h2>
      <ol>
        <li>
          利用者は、自ら著作権等の必要な知的財産権を有するか、または権利者から必要な許諾を受けた文章、画像等の著作物のみ、本サービスを利用して投稿及び編集できるものとします。
        </li>
        <li>
          利用者が本サービスを利用して投稿または編集した文章、画像等のコンテンツ（以下「利用者コンテンツ」といいます。）につき生じる著作権については、当該利用者あるいはその権利者に留保されるものとします。
        </li>
        <li>
          利用者または第三者は、利用者コンテンツについて、権利者の許可を得ることなく、無断で転載または二次配布等を行うことはできません。
        </li>
        <li>
          利用者は、運営者が利用者コンテンツを本ウェブサイトに掲載し、これを配信（公衆送信及び送信可能化することを含みます。）することを許諾するものとします。
        </li>
        <li>
          本条により運営者に許諾された利用者コンテンツに関する権利は、運営者と利用者の間の契約が終了後も引き続きその効力を保持するものとします。
        </li>
      </ol>
      <h2 className={styles.title}>
        第7条（広告の掲載）
      </h2>
      <p>
        運営者は、第三者の広告を本サービス上に掲載することができるものとします。
      </p>
      <h2 className={styles.title}>
        第8条（保証の否認および免責事項）
      </h2>
      <ol>
        <li>
          運営者は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
        </li>
        <li>
          利用者は、本サービスを運用するシステムに登録されたデータについて、運営者に保存責任・義務がないことを理解し、必要に応じて利用者自身でバックアップを取るものとします。運営者は、登録されたデータの消去、喪失等に関連して利用者が被った損害について、一切の責任を負いません。
        </li>
        <li>
          運営者は、本サービスの利用不能もしくは本サービスの利用による機器の故障もしくは損傷によって生じた損害、または利用者が本サービスによりアクセス可能な情報を不法に開示もしくは漏えいしたことにより発生した損害、その他の第三者の行為に起因して生じた損害について、一切の責任を負いません。
        </li>
      </ol>
      <h2 className={styles.title}>
        第9条（サービス内容の変更・停止）
      </h2>
      <ol>
        <li>
          運営者は、利用者に通知することなく、本サービスの内容の変更および一部機能の停止をすることができるものとします。
        </li>
        <li>
          運営者は、本サービスの終了に伴い利用者に生じる損害または不利益について責任を負いません。
        </li>
      </ol>
      <h2 className={styles.title}>
        第10条（利用規約の変更）
      </h2>
      <ol>
        <li>
          運営者は、以下の場合に、利用規約を変更することができます。発効日後に本サービスの利用を継続した場合には、変更内容につき承諾があったものとして取り扱われます。
        </li>
        <ol>
          <li>
            運営者は、利用者に通知または本ウェブサイト上に告知することにより、本サービスの内容又はシステムを変更することができます。なお、その変更が利用者にとって大きな影響があると運営者が判断した場合、可能な限り事前に通知または告知しますが、本サービスの運営上早急に対応が必要であると運営者が判断した場合には、この限りではありません。
          </li>
          <li>
            前項のほか、運営者は、1ヶ月後をめどに発効日を定めて変更後の規約の内容を利用者に通知または本ウェブサイト上に告知することにより、発効日をもって本規約を変更することができるものとします。
          </li>
        </ol>
        <li>
          運営者は、前項に従った本サービスの内容もしくはシステムの変更、または本規約の変更により生じたいかなる損害等についても責任を負いません。
        </li>
      </ol>
      <h2 className={styles.title}>
        第11条（権利義務の譲渡および貸与の禁止）
      </h2>
      <p>
        利用者は、運営者の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡および貸与することはできません。
      </p>
      <h2 className={styles.title}>
        第12条（準拠法・裁判管轄）
      </h2>
      <p>
        本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
      </p>
    </article>
  );
};

export default TermsOfUsePage;