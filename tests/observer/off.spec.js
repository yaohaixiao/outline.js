import off from '../../utils/observer/off'
import emit from '../../utils/observer/emit'
import on from '../../utils/observer/on'

describe('off() 方法', () => {
  let author = ''
  let authorCount = 0
  let career = ''
  let careerCount = 0
  let years = 0
  let yearsCount = 0
  const handlerAuthor = function (data) {
    author = data.author
    authorCount += 1
  }
  const handlerCareer = function (data) {
    career = data.career
    careerCount += 1
  }
  const handlerYears = function (data) {
    years = data.years
    yearsCount += 1
  }
  const PAYLOAD = { author: 'Robert Yao', career: 'programmer', years: 20 }

  on('author', handlerAuthor)
  on('author.career', handlerCareer)
  on('author.career.years', handlerYears)

  describe('传递 topic 和 token 两个参数:', () => {
    it(`off('author', handlerAuthor)：author 和 handlerAuthor（token 为 Function 类型）都有效`, () => {
      off('author', handlerAuthor)

      let result = emit('javascript', PAYLOAD, false)

      expect(result).toBe(false)
      expect(author).toEqual('')
      expect(authorCount).toEqual(0)
    })

    it(`off('author', '1')：author 和 token（为 String 类型，唯一ID值） 都有效`, () => {
      const token = on('author', handlerAuthor)
      off('author', token)

      let result = emit('javascript', PAYLOAD, false)

      expect(result).toBe(false)
      expect(author).toEqual('')
      expect(authorCount).toEqual(0)
    })

    it(`off('author.career.years', handlerCareer)：author.career.years 有效 handlerCareer 无效`, () => {
      off('author.career.years', handlerCareer)

      emit('author.career.years', PAYLOAD, false)

      expect(years).toEqual(20)
      expect(yearsCount).toEqual(1)
      expect(career).toEqual('programmer')
      expect(careerCount).toEqual(1)
    })

    it(`off('ages', handlerCareer)：ages 无效`, () => {
      const result = off('ages', handlerCareer)

      expect(result).toBe(false)
    })
  })

  describe('仅传递 topic 一个参数:', () => {
    it(`off('ages')：ages 无效`, () => {
      const result = off('ages')

      expect(result).toBe(false)
    })

    it(`off('author.career')：author.career 有效`, () => {
      off('author.career')

      const result = emit('author.career', PAYLOAD, false)

      expect(result).toBe(false)
      expect(off('author.career')).toBe(false)

      emit('author.career.years', PAYLOAD, false)

      expect(years).toEqual(20)
      expect(yearsCount).toEqual(2)
    })
  })
})
