import { join } from 'path'
import { readFile, unlink } from 'fs/promises'
import { LCOVFix as TheModule } from '@this/src/jest/lcovFix'

describe(TheModule.name, () => {
  const paths = {
    fileFixture: join(__dirname, 'fixtures/lcov.info'),
    fileTempOutput: '/tmp/__should_not_exist.file.hello.lcov',
  }

  afterEach(() => unlink(paths.fileTempOutput).catch(() => {}))

  describe(TheModule.tasks.checks.name, () => {
    const theFn = TheModule.tasks.checks

    describe('options', () => {
      describe('pathFile', () => {
        it('missing option', () =>
          expect(theFn()).rejects.toThrow('program exit(1)'))

        it('file does not exist', () =>
          expect(
            theFn({
              pathFile: join(paths.fileTempOutput, 'dsadsa/dy35345/dsa'),
            })
          ).rejects.toThrow('no such file or directory'))
      })

      it('file exist', () =>
        expect(
          theFn({
            pathFile: paths.fileFixture,
          })
        ).resolves.toHaveProperty('pathFile', paths.fileFixture))

      it('file exist, pathFileOutputSupplied', () =>
        expect(
          theFn({
            pathFile: paths.fileFixture,
            pathFileOutput: paths.fileTempOutput,
          })
        ).resolves.toHaveProperty('pathFileOutput', paths.fileTempOutput))
    })
  })

  describe(TheModule.execute.name, () => {
    it('works', async () => {
      await TheModule.execute({
        pathFile: paths.fileFixture,
        pathFileOutput: paths.fileTempOutput,
      })

      const fileContentsOutput = (
        await readFile(paths.fileTempOutput)
      ).toString()
      expect(fileContentsOutput).toContain('SF:/')
    })
  })
})
