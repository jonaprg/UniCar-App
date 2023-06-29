import { validateEmail, validatePassword, validateName } from '../../utils/validations.js'

describe('validateEmail', () => {
  it('should return true for a valid email address', () => {
    const email = 'test@example.com'
    const result = validateEmail(email)
    expect(result).toBe(true)
  })

  it('should return false for an invalid email address without a domain', () => {
    const email = 'test@'
    const result = validateEmail(email)
    expect(result).toBe(false)
  })

  it('should return false for an invalid email address without a username', () => {
    const email = '@example.com'
    const result = validateEmail(email)
    expect(result).toBe(false)
  })

  it('should return false for an invalid email address with special characters', () => {
    const email = 'test!@example.com'
    const result = validateEmail(email)
    expect(result).toBe(false)
  })
})

describe('validatePassword', () => {
  it('should return true for a valid password', () => {
    const password = 'Abcdef123'
    const result = validatePassword(password)
    expect(result).toBe(true)
  })

  it('should return false for an invalid password without uppercase characters', () => {
    const password = 'abcdef123'
    const result = validatePassword(password)
    expect(result).toBe(false)
  })

  it('should return false for an invalid password without lowercase characters', () => {
    const password = 'ABCDEF123'
    const result = validatePassword(password)
    expect(result).toBe(false)
  })

  it('should return false for an invalid password with special characters', () => {
    const password = 'Abcdef!123'
    const result = validatePassword(password)
    expect(result).toBe(false)
  })

  it('should return false for an invalid password with less than 6 characters', () => {
    const password = 'Abc12'
    const result = validatePassword(password)
    expect(result).toBe(false)
  })

  it('should return false for an invalid password with more than 20 characters', () => {
    const password = 'Abc12one2three4five6seveas'
    const result = validatePassword(password)
    expect(result).toBe(false)
  })

  it('should return true for an valid password with less than 20 characters', () => {
    const password = 'Abc12one2three4five6sev'
    const result = validatePassword(password)
    expect(result).toBe(false)
  })
})

describe('validateName', () => {
  it('returns true for valid names without special characters', () => {
    expect(validateName('John Doe')).toBe(true)
    expect(validateName('Jane Smith')).toBe(true)
    expect(validateName('Robert Johnson')).toBe(true)
  })

  it('returns false for names with special characters', () => {
    expect(validateName('John@Doe')).toBe(false)
    expect(validateName('Jane-Smith')).toBe(false)
    expect(validateName('Robert*Johnson')).toBe(false)
  })

  it('returns false for names with numbers', () => {
    expect(validateName('John Doe1')).toBe(false)
    expect(validateName('Jane Smith2')).toBe(false)
    expect(validateName('Robert Johnson123')).toBe(false)
  })

  it('returns false for names with length less than 3 characters', () => {
    expect(validateName('Jo')).toBe(false)
    expect(validateName('A')).toBe(false)
    expect(validateName('')).toBe(false)
  })

  it('returns false for names with length greater than 35 characters', () => {
    expect(validateName('John Doe John Doe John Doe John Doea')).toBe(false)
    expect(validateName('Jane Smith Jane Smith Jane Smith Jane Smith')).toBe(false)
    expect(validateName('Robert Johnson Robert Johnson Robert Johnson Robert Johnson')).toBe(false)
  })

  it('returns true for valid names with spaces in between', () => {
    expect(validateName('John      Doe')).toBe(true)
    expect(validateName('Jane  Smith')).toBe(true)
    expect(validateName('Robert        Johnson')).toBe(true)
  })
})
