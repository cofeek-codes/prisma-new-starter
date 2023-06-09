import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { PostsModule } from './posts/posts.module';

@Module({
	imports: [AuthModule, PostsModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
