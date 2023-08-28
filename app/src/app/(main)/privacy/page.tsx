import * as styles from './page.css';

import type { FC } from 'react';

export const runtime = 'edge';

const PrivacyPolicyPage: FC = () => {
  return (
    <article className={styles.article}>
      <p className={styles.paragraph}>
        本サービスは、以下のプライバシーポリシーを定め、個人の情報に関する保護法（平成十五年法律第五十七号、以下「個人情報保護法」）を遵守すると共に、適切なプライバシー情報の保護に努めます。
      </p>
      <h2 className={styles.sectionTitle}>
        第1条（個人情報の定義）
      </h2>
      <p className={styles.paragraph}>
        「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，連絡先その他の記述等により特定の個人を識別できる情報（個人識別情報）を指します。
      </p>
      <h2 className={styles.sectionTitle}>
        第2条（個人情報の取得方法）
      </h2>
      <p className={styles.paragraph}>
        本サービスは、アカウントの有効性の確認やアカウントの保護のため、登録ユーザーが利用登録をする際にメールアドレスなどの個人情報をお尋ねすることがあります。また、登録ユーザーと本サービスの提携先（情報提供元）などとの間でなされた登録ユーザーの個人情報を本サービスの提携先などから収集することがあります。
      </p>
      <h2 className={styles.sectionTitle}>
        第3条（個人情報の利用目的）
      </h2>
      <p className={styles.paragraph}>
        本サービスにおいてプライバシー情報を収集・利用する目的は、以下のとおりです。
      </p>
      <ol>
        <li className={styles.listItem}>
          本サービスに関する登録の受け付け、認証のため
        </li>
        <li className={styles.listItem}>
          登録ユーザーに、メールアドレスなどの登録情報に関する情報を表示する目的
        </li>
        <li className={styles.listItem}>
          本サービスの規約や法令に違反する行為に対する対応のため
        </li>
        <li className={styles.listItem}>
          以上の他、本サービスの提供、維持、保護及び改善のため
        </li>
      </ol>
      <h2 className={styles.sectionTitle}>
        第4条（個人情報の安全管理措置）
      </h2>
      <p className={styles.paragraph}>
        当社は、個人情報の正確性及び安全性を確保するために、セキュリティ対策をはじめとする安全対策を実施し、個人情報の漏えい、滅失またはき損の防止及び是正に努めます。
      </p>
      <h2 className={styles.sectionTitle}>
        第5条（個人情報の第三者提供）
      </h2>
      <p className={styles.paragraph}>
        当サービスは、次に掲げる場合を除いて、予め登録ユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
      </p>
      <ol>
        <li className={styles.listItem}>
          人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
        </li>
        <li className={styles.listItem}>
          公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
        </li>
        <li className={styles.listItem}>
          国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
        </li>
        <li className={styles.listItem}>
          予め次の事項を告知あるいは公表をしている場合
        </li>
        <ol>
          <li className={styles.listItem}>
            利用目的に第三者への提供を含むこと
          </li>
          <li className={styles.listItem}>
            第三者に提供されるデータの項目
          </li>
          <li className={styles.listItem}>
            第三者への提供の手段または方法
          </li>
          <li className={styles.listItem}>
            本人の求めに応じて個人情報の第三者への提供を停止すること
          </li>
        </ol>
      </ol>
      <p className={styles.paragraph}>
        前項の定めにかかわらず、次に掲げる場合は第三者提供には該当しないものとします。
      </p>
      <ol>
        <li className={styles.listItem}>
          当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
        </li>
        <li className={styles.listItem}>
          合併その他の事由による事業の承継に伴って個人情報が提供される場合
        </li>
      </ol>
      <h2 className={styles.sectionTitle}>
        第6条（個人情報の訂正および削除）
      </h2>
      <p className={styles.paragraph}>
        登録ユーザーは、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、当社に対して個人情報の訂正または削除を請求することができます。当社は、登録ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正または削除を行い、これを登録ユーザーに通知します。
      </p>
      <h2 className={styles.sectionTitle}>
        第7条（プライバシーポリシーの変更）
      </h2>
      <p className={styles.paragraph}>
        本ポリシーの内容は、登録ユーザーに通知することなく、変更できるものとします。変更後のプライバシーポリシーは、本ページに掲載したときから効力を生じるものとします。
      </p>
      <h2 className={styles.sectionTitle}>
        第8条（お問い合わせ窓口）
      </h2>
      <p className={styles.paragraph}>
        本ポリシーに関するお問い合わせ、その他プライバシー情報に関するご相談、お問い合わせは、下記の窓口までお願いいたします。
      </p>
      <p className={styles.paragraph}>
        Email: <a href="mailto:incpraha@gmail.com">incpraha@gmail.com</a>
      </p>
    </article>
  );
};

export default PrivacyPolicyPage;
