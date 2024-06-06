import cls from './AboutPage.module.scss';

export const AboutPage = () => {
  return (
    <section className={`${cls.AboutPage} container`} style={{ textAlign: 'center' }}>
      <h1>Who are we?</h1>
      <p className={cls.text}>
        We&apos;re passionate coffee enthusiasts. Our mission is to help Berlin residents and visitors find great
        coffee. We gather information about top specialty coffee shops from open sources and personal experiences. Here,
        you&apos;ll easily find your perfect coffee shop on our{' '}
        <a className={cls.link} href="/">
          map
        </a>
        .
      </p>
    </section>
  );
};
