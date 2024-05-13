import React, { useState, ChangeEvent, FormEvent } from "react"; // Ensure useState is imported
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import PhotoSlider from "../Slider/Slider";
import styles from "./style.module.css";

interface FormData {
  heading: string;
  description: string;
  photo: File | null;
  startDate: string;
  firmName: string;
  projectType: string;
  catalogLink: string;
}

const AddNew: React.FC = () => {
  const slides = [
    { image: image1, text: "image-1" },
    { image: image2, text: "image-2" },
    { image: image3, text: "image-3" },
  ];
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    description: "",
    photo: null,
    startDate: "",
    firmName: "",
    projectType: "",
    catalogLink: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    // Handle the form submission, e.g., sending data to a server
  };
  return (
    <div className={styles.addNew}>
      <PhotoSlider slides={slides} />

      <div className={styles.addnewContainer}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Heading:
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Upload Photo:
              <input type="file" name="photo" onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Starting Date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Firm Name:
              <input
                type="text"
                name="firmName"
                value={formData.firmName}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Project Type:
              <input
                type="text"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Catalog Link:
              <input
                type="url"
                name="catalogLink"
                value={formData.catalogLink}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
