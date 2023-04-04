import {Body, Controller, Get, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CategoryService} from "./category.service";
import {CreateEditCategoryDto} from "./dto/create-edit-category.dto";


@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(public readonly categoryService: CategoryService) {
    }

    @Get('')
    public async getCategories() {
        return this.categoryService.getCategories()
    }

    @Post()
    public async createCategory(@Body() body: CreateEditCategoryDto) {

    }
}


