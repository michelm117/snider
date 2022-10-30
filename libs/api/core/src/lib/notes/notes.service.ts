import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from '@snider/api-interfaces';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Note)
    private notesRepository: Repository<Note>
  ) {}

  async create(createNoteDto: CreateNoteDto, user: User) {
    const note = this.notesRepository.create(createNoteDto);
    note.user = user;
    return await this.notesRepository.save(note);
  }

  findAll(user: User) {
    return this.notesRepository.find({ where: { user: user } });
  }

  async findAllInfo(user: User) {
    const notes = await this.notesRepository.find({ where: { user: user } });
    return notes.map((note) => {
      return { id: note.id, name: note.name };
    });
  }

  findOne(id: number, user: User) {
    this.notesRepository.findOneByOrFail({ id: id, user: user });
  }

  update(id: number, updateNoteDto: UpdateNoteDto, user: User) {
    return `This action updates a #${id} note`;
  }

  remove(id: number, user: User) {
    return `This action removes a #${id} note`;
  }
}
