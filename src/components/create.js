import { createOfer } from "../api/data.js";
import {html} from "../lib.js";

const createTemplate = html`
<section id="create">
          <div class="form">
            <h2>Create Offer</h2>
            <form @submit =${getCreate} class="create-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>`

    let ctx = null;
    export async function showCreate (contex) {
        ctx = contex;
        ctx.render(createTemplate)
    }

    async function getCreate (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {title,imageUrl, category, description, requirements, salary} = Object.fromEntries(formData);
        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            alert("All fields are requared!");
            return;
        }

        await createOfer({title,imageUrl, category, description, requirements, salary});
        ctx.page.redirect("/catalog")

    }