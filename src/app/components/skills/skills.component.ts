import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { NgFor } from '@angular/common';
import { Skill } from '../../models/skill.type';

@Component({
  selector: 'app-profile',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatDivider
  ]
})
export class SkillsComponent {
  public skills: Skill[] = [
    { name: 'C#', description: 'awd' },
    { name: 'TypeScript', description: 'awd' },
    { name: 'JavaScript', description: 'awd' },
    { name: 'HTML', description: 'awd' },
    { name: 'CSS', description: 'awd' },
    { name: 'SCSS', description: 'awd' },
    { name: 'T-SQL', description: 'awd' },
    { name: 'PowerShell', description: 'awd' },
    { name: 'Docker', description: 'awd' }
  ];
}
