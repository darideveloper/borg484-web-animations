// import variables
import { params, gl, uniforms } from './script.js'


export class Render {
  
  constructor(goalAmount, initialAmount) {

    // Save initial values
    this.goalAmount = goalAmount;
    this.currentAmount = initialAmount;

    // First render
    this.updateVisibility()
  }

  /**
   * Render flowers based in donations
   * @param {int} goal
   * @param {int} initialAmount
   */
  updateVisibility() {
    // Calculate percentage of donations
    const percentage = this.currentAmount / this.goalAmount;

    // Render
    gl.uniform1f(uniforms.u_visibility, percentage);
  }

  addDonation(amount) {
    this.currentAmount += amount;
    this.updateVisibility();
  }

}
