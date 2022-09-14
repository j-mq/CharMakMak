import asyncHandler from 'express-async-handler';
import { Project } from '../models/projectModel';
// import { User } from "../models/userModel";

//@desc   Get goals
//@route  GET /api/project/:id
//@access Private
export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error('Project not found');
  } else {
    res.status(200).json(project);
  }
});

//@desc   Set goals
//@route  POST /api/goals
//@access Private
export const setProject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    console.log('THE req body', req.body);
    res.status(400);
    throw new Error('Please provide a text value');
  }
  // if (req.user) {
  //   const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  //   res.status(200).json(goal);
  // }
  const project = await Project.create({
    name: req.body.name,
    nftAllowed: req.body.nftAllowed || false,
  });

  res.status(200).json(project);
});

//@desc   Update goal
//@route  PUT /api/goals/:id
//@access Private
// export const updateGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id);
//   if (!goal) {
//     res.status(400);
//     throw new Error("Goal not found");
//   }

//   if (req.user) {
//     //Make sure the loged in user matches the goal user
//     if (goal.user.toString() !== req.user.id) {
//       res.status(401);
//       throw new Error("User not authorized");
//     }
//     const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedGoal);
//   } else if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }
// });

//@desc   Delete goal
//@route  GET /api/goals/:id
//@access Private
// export const deleteGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id);
//   if (!goal) {
//     res.status(400);
//     throw new Error("Goal not found");
//   }

//   if (req.user) {
//     //Make sure the loged in user matches the goal user
//     if (goal.user.toString() !== req.user.id) {
//       res.status(401);
//       throw new Error("User not authorized");
//     }
//     await goal.remove();
//     res.status(200).json({ id: req.params.id });
//   } else if (!req.user) {
//     res.status(401);
//     throw new Error("User not found");
//   }
// });
