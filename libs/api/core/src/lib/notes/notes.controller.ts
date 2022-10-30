import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ExtendedRequest } from '@snider/api-interfaces';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: ExtendedRequest, @Body() createNoteDto: CreateNoteDto) {
    const user = req.user;
    return this.notesService.create(createNoteDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: ExtendedRequest) {
    const user = req.user;
    return this.notesService.findAll(user);
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  findAllInfo(@Req() req: ExtendedRequest) {
    const user = req.user;
    return this.notesService.findAllInfo(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: ExtendedRequest, @Param('id') id: string) {
    const user = req.user;
    return this.notesService.findOne(+id, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: ExtendedRequest,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto
  ) {
    const user = req.user;
    return this.notesService.update(+id, updateNoteDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Req() req: ExtendedRequest, @Param('id') id: string) {
    const user = req.user;
    return this.notesService.remove(+id, user);
  }
}
