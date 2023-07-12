import express from 'express';
const router = express.Router();
import { projects } from '../data/projects';
import { IProject } from "../interfaces/project.interface";

router.get('/projects', (req, res) => {
    try {
      const activeProjects = projects.filter(project => project.isActive);
      res.json(activeProjects);
    } catch (error) {
      res.status(500).json(error);
    }
})

router.get('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const project = projects.find((project: IProject) => project.id === id);
    if (!project) {
      return res.status(404).send();
    }
    res.json(project);
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/projects', (req, res) => {
  const { 
    name, 
    description,
    imageUrl,
    contractDate,
    budget
  } 
  = req.body;
  const id = projects.length + 1;
  const isActive = true;
  const newProject = { id, name, description, imageUrl, contractDate, budget, isActive };

  try {
    projects.push(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).send('Error! ' + error);
  }
})

router.patch('/projects/:id', (req, res) => {
  const updates = Object.keys(req.body)
  const id = parseInt(req.params.id);
  try {
    const project = projects.find((project: IProject) => project.id === id);
    if (!project) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      if (update in project) {
        (project as any)[update] = req.body[update];
      }
    });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
})

router.delete('/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const project = projects.find((project: IProject) => project.id === id);
    if (!project) {
      return res.status(404).send();
    }
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
})

export default router;