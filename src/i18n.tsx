import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { useStore } from '@/store'

export type Lang = 'en' | 'bm' | 'zh' | 'ms'

const strings = {
  en: {
    nav_home: 'Home',
    nav_tv: 'TV Shows',
    nav_movies: 'Movies',
    nav_new: 'New & Popular',
    nav_myList: 'My List',
    sign_in: 'Sign In',
    sign_out: 'Sign out',
    get_started: 'Get Started',
    hero_title: 'Unlimited movies, TV shows, and more',
    hero_sub: 'Starts at RM 18.90. Cancel anytime.',
    hero_hint:
      'Ready to watch? Enter your email to create or restart your membership.',
    email: 'Email address',
    more_reasons: 'More reasons to join',
    feature_tv_title: 'Enjoy on your TV',
    feature_tv_body:
      'Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
    feature_dl_title: 'Download your shows to watch offline',
    feature_dl_body: 'Save your favorites easily and always have something to watch.',
    feature_everywhere_title: 'Watch everywhere',
    feature_everywhere_body:
      'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
    feature_kids_title: 'Create profiles for kids',
    feature_kids_body:
      'Send kids on adventures with their favorite characters in a space made just for them — free with your membership.',
    auth_signIn: 'Sign In',
    auth_signUp: 'Sign Up',
    auth_password: 'Password',
    auth_email: 'Email',
    auth_needHelp: 'Need help?',
    auth_remember: 'Remember me',
    auth_newTo: 'New to Netflix?',
    auth_signupNow: 'Sign up now',
    auth_haveAccount: 'Already have an account?',
    auth_loginNow: 'Sign in now',
    auth_recap:
      "This page is protected by Google reCAPTCHA to ensure you're not a bot.",
    auth_email_invalid: 'Please enter a valid email.',
    auth_pass_invalid: 'Your password must contain at least 4 characters.',
    auth_exists: 'This email is already registered.',
    auth_bad_credentials: 'Incorrect email or password.',
    profiles_title: "Who's watching?",
    profiles_manage: 'Manage Profiles',
    browse_search_placeholder: 'Titles, people, genres',
    billboard_label: 'Series',
    play: 'Play',
    more_info: 'More Info',
    details_genres: 'Genres',
    details_thisTitleIs: 'This title is',
    details_thisTitleIs_val: 'Quirky, Suspenseful, Cinematic',
    details_add_myList: 'My List',
    details_remove_myList: 'Remove',
    player_back: 'Back',
    player_loading: 'Loading…',
    trending_now: 'Trending Now',
    faq_title: 'Frequently Asked Questions',
    faq_q1: 'What is Netflix?',
    faq_a1:
      'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more — on thousands of internet-connected devices.',
    faq_q2: 'How much does Netflix cost?',
    faq_a2:
      'Watch Netflix on your smartphone, tablet, smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range depending on your region.',
    faq_q3: 'Where can I watch?',
    faq_a3:
      'Watch anywhere, anytime. Sign in to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app.',
    faq_q4: 'How do I cancel?',
    faq_a4:
      'Netflix is flexible. There are no cancellation fees — start or stop your account at any time.',
    faq_q5: 'What can I watch on Netflix?',
    faq_a5:
      'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.',
    faq_q6: 'Is Netflix good for kids?',
    faq_a6:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
    footer_questions: 'Questions? Contact us.',
  },
  bm: {
    nav_home: 'Utama',
    nav_tv: 'Rancangan TV',
    nav_movies: 'Filem',
    nav_new: 'Baharu & Popular',
    nav_myList: 'Senarai Saya',
    sign_in: 'Log Masuk',
    sign_out: 'Log keluar',
    get_started: 'Mula',
    hero_title: 'Filem, rancangan TV dan banyak lagi tanpa had',
    hero_sub: 'Bermula pada RM 18.90. Batal bila-bila masa.',
    hero_hint:
      'Sedia untuk menonton? Masukkan e-mel anda untuk membuat atau mulakan semula keahlian.',
    email: 'Alamat e-mel',
    more_reasons: 'Lebih banyak sebab untuk sertai',
    feature_tv_title: 'Nikmati di TV anda',
    feature_tv_body:
      'Tonton di TV Pintar, Playstation, Xbox, Chromecast, Apple TV, pemain Blu-ray dan banyak lagi.',
    feature_dl_title: 'Muat turun rancangan untuk tontonan luar talian',
    feature_dl_body:
      'Simpan kegemaran anda dengan mudah dan sentiasa ada sesuatu untuk ditonton.',
    feature_everywhere_title: 'Tonton di mana-mana',
    feature_everywhere_body:
      'Strim filem dan rancangan TV tanpa had pada telefon, tablet, komputer riba dan TV anda.',
    feature_kids_title: 'Cipta profil untuk kanak-kanak',
    feature_kids_body:
      'Bawa kanak-kanak mengembara dengan watak kegemaran dalam ruang khas untuk mereka — percuma dengan keahlian anda.',
    auth_signIn: 'Log Masuk',
    auth_signUp: 'Daftar',
    auth_password: 'Kata laluan',
    auth_email: 'E-mel',
    auth_needHelp: 'Perlukan bantuan?',
    auth_remember: 'Ingat saya',
    auth_newTo: 'Baharu di Netflix?',
    auth_signupNow: 'Daftar sekarang',
    auth_haveAccount: 'Sudah ada akaun?',
    auth_loginNow: 'Log masuk sekarang',
    auth_recap:
      'Halaman ini dilindungi oleh Google reCAPTCHA untuk memastikan anda bukan bot.',
    auth_email_invalid: 'Sila masukkan e-mel yang sah.',
    auth_pass_invalid: 'Kata laluan mesti sekurang-kurangnya 4 aksara.',
    auth_exists: 'E-mel ini sudah didaftarkan.',
    auth_bad_credentials: 'E-mel atau kata laluan tidak tepat.',
    profiles_title: 'Siapa yang menonton?',
    profiles_manage: 'Urus Profil',
    browse_search_placeholder: 'Tajuk, orang, genre',
    billboard_label: 'Siri',
    play: 'Main',
    more_info: 'Maklumat Lanjut',
    details_genres: 'Genre',
    details_thisTitleIs: 'Tajuk ini',
    details_thisTitleIs_val: 'Unik, Mendebarkan, Sinematik',
    details_add_myList: 'Senarai Saya',
    details_remove_myList: 'Buang',
    player_back: 'Kembali',
    player_loading: 'Memuatkan…',
    trending_now: 'Kini Trending',
    faq_title: 'Soalan Lazim',
    faq_q1: 'Apakah Netflix?',
    faq_a1:
      'Netflix ialah perkhidmatan penstriman yang menawarkan pelbagai rancangan TV, filem, anime, dokumentari dan banyak lagi pada peranti yang disambungkan ke internet.',
    faq_q2: 'Berapakah kos Netflix?',
    faq_a2:
      'Tonton Netflix pada telefon pintar, tablet, TV pintar, komputer riba atau peranti penstriman dengan yuran bulanan tetap. Pelan berbeza mengikut rantau.',
    faq_q3: 'Di mana saya boleh menonton?',
    faq_a3:
      'Tonton di mana-mana, bila-bila masa. Log masuk untuk menonton serta-merta di web atau pada mana-mana peranti yang menyokong aplikasi Netflix.',
    faq_q4: 'Bagaimana untuk batalkan?',
    faq_a4:
      'Netflix fleksibel. Tiada yuran pembatalan — mulakan atau hentikan akaun anda pada bila-bila masa.',
    faq_q5: 'Apa yang boleh saya tonton di Netflix?',
    faq_a5:
      'Netflix mempunyai perpustakaan filem, dokumentari, siri TV, anime, Netflix Originals dan banyak lagi.',
    faq_q6: 'Adakah Netflix sesuai untuk kanak-kanak?',
    faq_a6:
      'Pengalaman Netflix Kanak-kanak disertakan untuk memberi ibu bapa kawalan, sementara kanak-kanak menikmati kandungan mesra keluarga dalam ruang sendiri.',
    footer_questions: 'Soalan? Hubungi kami.',
  },
  zh: {
    nav_home: '首页',
    nav_tv: '电视剧',
    nav_movies: '电影',
    nav_new: '新片与热门',
    nav_myList: '我的片单',
    sign_in: '登录',
    sign_out: '退出登录',
    get_started: '开始使用',
    hero_title: '海量电影、剧集和更多内容',
    hero_sub: '低至 RM 18.90。随时取消。',
    hero_hint: '准备观看？输入邮箱以创建或重新开始会员资格。',
    email: '邮箱地址',
    more_reasons: '加入的更多理由',
    feature_tv_title: '在电视上畅享',
    feature_tv_body:
      '可在智能电视、Playstation、Xbox、Chromecast、Apple TV、蓝光播放器等设备上观看。',
    feature_dl_title: '下载节目，离线观看',
    feature_dl_body: '轻松保存你喜欢的内容，随时都有可看。',
    feature_everywhere_title: '随处观看',
    feature_everywhere_body:
      '在手机、平板、笔记本电脑和电视上无限畅看电影与剧集。',
    feature_kids_title: '为儿童创建个人资料',
    feature_kids_body:
      '让孩子在专属空间里与喜爱的角色一起冒险——会员免费包含。',
    auth_signIn: '登录',
    auth_signUp: '注册',
    auth_password: '密码',
    auth_email: '邮箱',
    auth_needHelp: '需要帮助？',
    auth_remember: '记住我',
    auth_newTo: 'Netflix 新用户？',
    auth_signupNow: '立即注册',
    auth_haveAccount: '已有账号？',
    auth_loginNow: '立即登录',
    auth_recap: '此页面受 Google reCAPTCHA 保护，以确保你不是机器人。',
    auth_email_invalid: '请输入有效的邮箱。',
    auth_pass_invalid: '密码至少需要 4 个字符。',
    auth_exists: '该邮箱已注册。',
    auth_bad_credentials: '邮箱或密码错误。',
    profiles_title: '谁在观看？',
    profiles_manage: '管理个人资料',
    browse_search_placeholder: '片名、人物、类型',
    billboard_label: '剧集',
    play: '播放',
    more_info: '更多信息',
    details_genres: '类型',
    details_thisTitleIs: '此片风格',
    details_thisTitleIs_val: '独特、紧张、电影质感',
    details_add_myList: '我的片单',
    details_remove_myList: '移除',
    player_back: '返回',
    player_loading: '加载中…',
    trending_now: '当下热门',
    faq_title: '常见问题',
    faq_q1: '什么是 Netflix？',
    faq_a1:
      'Netflix 是一项流媒体服务，提供丰富的电视剧、电影、动漫、纪录片等内容，可在各种联网设备上观看。',
    faq_q2: 'Netflix 多少钱？',
    faq_a2:
      '你可以在手机、平板、智能电视、电脑或流媒体设备上以固定月费观看。不同地区的套餐价格不同。',
    faq_q3: '我可以在哪里观看？',
    faq_a3:
      '随时随地观看。登录后可在网页端或支持 Netflix 应用的设备上立即观看。',
    faq_q4: '如何取消？',
    faq_a4:
      'Netflix 很灵活。没有取消费用——你可以随时开始或停止订阅。',
    faq_q5: 'Netflix 上有什么可看？',
    faq_a5:
      'Netflix 拥有海量电影、纪录片、剧集、动漫、获奖 Netflix 原创作品等内容。',
    faq_q6: 'Netflix 适合儿童吗？',
    faq_a6:
      '会员包含儿童体验，家长可设置分级与限制，让孩子在专属空间里观看适合家庭的内容。',
    footer_questions: '有疑问？请联系我们。',
  },
} as const

export type I18nKey = keyof (typeof strings)['en']

type Ctx = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: I18nKey) => string
}

const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const { lang, setLang } = useStore()
  const effectiveLang: Exclude<Lang, 'ms'> = lang === 'ms' ? 'bm' : lang

  useEffect(() => {
    if (lang === 'ms') setLang('bm')
    document.documentElement.lang = effectiveLang === 'bm' ? 'ms' : effectiveLang
  }, [lang, setLang, effectiveLang])

  const t = useMemo(() => {
    return (key: I18nKey) =>
      (strings as any)[effectiveLang]?.[key] ?? strings.en[key] ?? String(key)
  }, [effectiveLang])

  const value = useMemo(
    () => ({ lang: effectiveLang, setLang, t }),
    [effectiveLang, setLang, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('I18nProvider missing')
  return ctx
}
