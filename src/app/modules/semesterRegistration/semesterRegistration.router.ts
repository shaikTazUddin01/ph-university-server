import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrations } from './semesterRegistration.validation'
import { SemesterRegistrationController } from './semesterRegistration.controller'

const router= express.Router()

router.post('/create-semester-registration',validateRequest(SemesterRegistrations.createSemesterRegistrationValidationSchmea),SemesterRegistrationController.createSemesterRegistration)

router.get('/',SemesterRegistrationController.findSemesterRegistration)
router.get('/:id',SemesterRegistrationController.findSingleSemesterRegistration)
router.patch('/:id',SemesterRegistrationController.updateSemesterRegistration)

export const SemesterRegistration = router
