import fly from './index'
export default {
  STATIC_HOST: 'https://statics.zhuishushenqi.com',
  //获取大分类
  getCats() {
    return fly.get('/cats/lv2/statistics')
  },
  //获取小类
  getMinor() {
    return fly.get('/cats/lv2')
  },
  //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始 
  getCatsBooks(gender, type, major, minor, start) {
    if (minor) {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
    } else {
      return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
    }
  },
  // 书籍详情
  bookInfo(book_id) {
    return fly.get('/book/' + book_id)
  },
  // 相关推荐
  relatedRecommendedBooks(book_id) {
    return fly.get(`/book/${book_id}/recommend`)
  },
  // 作者名下的书籍
  authorBooks(author) {
    return fly.get(`/book/accurate-search?author=${author}`)
  },
  // 书源  注意：第一个优质书源为收费源
  bookSources(book_id) {
    return `/atoc?view=summary&book=${book_id}`
  },
  // 书籍章节 根据书源id
  bookChapters(id) {
    return fly.get(`/atoc/${id}?view=chapters`)
  },
  // 章节内容
  chapterContent(link) {
    return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
  },
  //搜索热词
  hotWord() {
    return fly.get(`/book/hot-word`)
  },
  // 书籍搜索 (分类，书名，作者名)
  bookSearch(content,page) {
    return fly.get(`/book/fuzzy-search?start=${page}&limit=10&v=1&query=${content}`)
  },
  // 排名分类
  rankCategory() {
    return fly.get('/ranking/gender')
  },
  // 排名详情
  rankInfo(rank_id) {
    return fly.get(`/ranking/${rank_id}`)
  },
  // 讨论
  discussions(book_id) {
    return fly.get(`/post/by-book?book=${book_id}`)
  },
  // 短评
  shortReviews(book_id,page,size) {
    return fly.get(`/post/short-review?book=${book_id}&limit=${size}&total=true&start=${page}&sortType=newest`)
  },
  //长评
  bookReviews(book_id) {
    return fly.get(`post/review/by-book?book=${book_id}`)
  }
}