import {Generator, GeneratorOptions} from "../generator"
import {join} from "path"

export interface PagesGeneratorOptions extends GeneratorOptions {
  ModelName: string
  ModelNames: string
  modelName: string
  modelNames: string
  parentModel?: string
  parentModels?: string
  ParentModel?: string
  ParentModels?: string
}

export class PagesGenerator extends Generator<PagesGeneratorOptions> {
  sourceRoot = join(__dirname, "./templates/pages")

  private getId(input: string = "") {
    if (!input) return input
    return `${input}Id`
  }

  private getParam(input: string = "") {
    if (!input) return input
    return `[${input}]`
  }

  // eslint-disable-next-line require-await
  async getTemplateValues() {
    return {
      parentModelId: this.getId(this.options.parentModel),
      parentModelParam: this.getParam(this.getId(this.options.parentModel)),
      parentModel: this.options.parentModel,
      parentModels: this.options.parentModels,
      ParentModel: this.options.ParentModel,
      ParentModels: this.options.ParentModels,
      modelId: this.getId(this.options.modelName),
      modelIdParam: this.getParam(this.getId(this.options.modelName)),
      modelName: this.options.modelName,
      modelNames: this.options.modelNames,
      ModelName: this.options.ModelName,
      ModelNames: this.options.ModelNames,
      modelNamesPath: this.getModelNamesPath(),
    }
  }

  getModelNamesPath() {
    const context = this.options.context ? `${this.options.context}/` : ""
    return context + this.options.modelNames
  }

  getTargetDirectory() {
    const parent = this.options.parentModels
      ? `${this.options.parentModels}/__parentModelParam__/`
      : ""
    return `app/${this.getModelNamesPath()}/pages/${parent}${this.options.modelNames}`
  }
}
