import validator from 'validator';
import { Schema, model, connect, Aggregate } from 'mongoose';
import Student, {
  Guardian,
  LocalGuardian,
  UserName,
} from './seudent.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
  },

  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<Student>(
  {
    // id: {
    //   type: String,
    //   // unique: true ,
    //   // message:"Id Must be unique",
    // },
    user:{
      type:Schema.Types.ObjectId,
      required: [true, "user id is required"],
      unique:true,
      ref:'User'
    },
    // password: {
    //   type: String,
    //   required: [true, 'password is required'],
    // },
    name: {
      type: userNameSchema,
      required: [true, "Student's name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      // unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodgroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Blood group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required'],
    },
    profileImg: {
      type: String,
    },
    // isActive: {
    //   type: String,
    //   enum: {
    //     values: ['active', 'blocked'],
    //     message: '{VALUE} is not supported',
    //   },
    //   default: 'active',
    // },
    // isDeleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual

// studentSchema.virtual('fullname').get(function () {
//   return `${this.name.firstName} ${this?.name?.middleName} ${this.name.lastName}`;
// });

//pre middleware
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre student data');
//   const user = this;
//   user.password = await bcrypt.hash(user.password, Number(config.salt_round));
//   next();
// });

// //post middleware
// studentSchema.post('save', function (doc, next) {
//   doc.password = '';
//   // console.log(this, 'this is post middleware');
//   next();
// });

//query middlewware
// studentSchema.pre('find', function (next) {
//   // console.log(this);
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
// studentSchema.pre('findOne', function (next) {
//   // console.log(this);
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// studentSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });
// Create model

const StudentModel = model<Student>('Student', studentSchema);

export default StudentModel;
