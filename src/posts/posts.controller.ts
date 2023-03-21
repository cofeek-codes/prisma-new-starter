import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common'
import { Auth } from 'decorators/auth.decorator'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post('new')
	@Auth()
	create(@Body() createPostDto: CreatePostDto) {
		return this.postsService.create(createPostDto)
	}

	@Get('all')
	async findAll() {
		return await this.postsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(+id)
	}

	@Patch(':id')
	@Auth()
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postsService.update(+id, updatePostDto)
	}

	@Delete(':id')
	@Auth()
	remove(@Param('id') id: string) {
		return this.postsService.remove(+id)
	}
}
