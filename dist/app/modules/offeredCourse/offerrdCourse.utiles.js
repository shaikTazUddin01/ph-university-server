"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTimeConflict = void 0;
const hasTimeConflict = (assignedSchedules, newSchedule) => {
    for (const schedule of assignedSchedules) {
        const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
        const newStartingTime = new Date(`1970-01-01T${newSchedule.startTime}`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
        if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    // assignedSchedules.forEach((schedule) => {
    //   });
    return false;
};
exports.hasTimeConflict = hasTimeConflict;
